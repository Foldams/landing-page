import nodemailer from 'npm:nodemailer';
import { createClient } from 'npm:@supabase/supabase-js@2';

// Initialize Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') || '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') || '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Create a unique request ID for logging
const requestId = crypto.randomUUID();

// Function to log email attempts
async function logEmailAttempt(toAddress, subject, status, messageId = null, errorMessage = null) {
  try {
    const { error } = await supabase
      .from('app_756f9e3ca9454cb782f1af778d02d691_email_logs')
      .insert({
        to_address: toAddress,
        subject,
        status,
        message_id: messageId,
        error_message: errorMessage
      });

    if (error) {
      console.error(`[${requestId}] Error logging email attempt:`, error);
    }
  } catch (err) {
    console.error(`[${requestId}] Failed to log email:`, err);
  }
}

Deno.serve(async (req) => {
  // Handle OPTIONS for CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': '*'
      }
    });
  }

  // Log request details
  console.log(`[${requestId}] Received ${req.method} request`);
  
  if (req.method !== 'POST') {
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }), 
      { 
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  // Parse request body
  let data;
  try {
    data = await req.json();
    console.log(`[${requestId}] Parsed request body, sending to: ${data.to}, subject: ${data.subject}`);
  } catch (error) {
    console.error(`[${requestId}] Error parsing request body:`, error);
    return new Response(
      JSON.stringify({ error: 'Invalid JSON in request body' }), 
      { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  // Validate required fields
  if (!data.to || !data.subject || (!data.text && !data.html)) {
    const errorMessage = 'Missing required fields: to, subject, and text or html content';
    console.error(`[${requestId}] ${errorMessage}`);
    await logEmailAttempt(data.to || 'unknown', data.subject || 'unknown', 'FAILED', null, errorMessage);
    
    return new Response(
      JSON.stringify({ error: errorMessage }), 
      { 
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  try {
    // Use Gmail instead of Office 365
    const transporter = nodemailer.createTransport({
      service: 'Gmail',  // Using Gmail service preset
      auth: {
        user: Deno.env.get('GMAIL_USER'),
        pass: Deno.env.get('GMAIL_APP_PASSWORD')
      }
    });

    console.log(`[${requestId}] Created transporter with Gmail service`);
    
    // Log SMTP connection details (without sensitive info)
    console.log(`[${requestId}] Using Gmail SMTP service`);
    
    // Prepare email options
    const mailOptions = {
      from: Deno.env.get('GMAIL_USER') || data.from,
      to: data.to,
      subject: data.subject,
      text: data.text,
      html: data.html,
    };
    
    // Add reply-to if specified
    if (data.replyTo) {
      mailOptions.replyTo = data.replyTo;
    }

    // Send the email
    console.log(`[${requestId}] Attempting to send email`);
    const info = await transporter.sendMail(mailOptions);
    console.log(`[${requestId}] Email sent successfully:`, info.messageId);
    
    // Log successful email
    await logEmailAttempt(data.to, data.subject, 'SUCCESS', info.messageId);
    
    return new Response(
      JSON.stringify({ 
        success: true, 
        messageId: info.messageId 
      }), 
      { 
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  } catch (error) {
    const errorMessage = error.message || 'Unknown error';
    console.error(`[${requestId}] Error sending email:`, error);
    
    // Log failed email
    await logEmailAttempt(data.to, data.subject, 'FAILED', null, errorMessage);
    
    return new Response(
      JSON.stringify({ 
        error: errorMessage,
        details: JSON.stringify(error)
      }), 
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
});