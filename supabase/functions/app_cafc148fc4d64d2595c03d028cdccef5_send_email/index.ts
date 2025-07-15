import { createClient } from 'npm:@supabase/supabase-js@2';
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import nodemailer from 'npm:nodemailer';

// Set up Supabase client
const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';
const supabase = createClient(supabaseUrl, supabaseKey);

// Email configuration
const smtpHost = Deno.env.get('SMTP_HOST') ?? '';
const smtpPort = parseInt(Deno.env.get('SMTP_PORT') ?? '587');
const smtpUser = Deno.env.get('SMTP_USER') ?? '';
const smtpPassword = Deno.env.get('SMTP_PASSWORD') ?? '';
const smtpFrom = Deno.env.get('SMTP_FROM') ?? 'no-reply@foldamsinc.com';
const smtpSecure = Deno.env.get('SMTP_SECURE') === 'true';

serve(async (req) => {
  // Generate request ID for tracking
  const requestId = crypto.randomUUID();
  console.log(`[${requestId}] Processing email request`);

  // Handle preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  // Parse request body
  let body;
  try {
    body = await req.json();
  } catch (error) {
    console.error(`[${requestId}] Invalid request body:`, error);
    return new Response(
      JSON.stringify({ error: "Invalid request body" }),
      { 
        status: 400, 
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  // Validate required fields
  const { to, subject, body: emailBody, name } = body;
  
  if (!to || !subject || !emailBody) {
    console.error(`[${requestId}] Missing required fields`);
    return new Response(
      JSON.stringify({ error: "Missing required fields: to, subject, body" }),
      { 
        status: 400, 
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPassword,
      },
    });

    console.log(`[${requestId}] Attempting to send email to ${to}`);

    // Send email
    const info = await transporter.sendMail({
      from: smtpFrom,
      to,
      subject,
      text: emailBody,
      html: `<div>${emailBody}</div>`,
    });

    console.log(`[${requestId}] Email sent successfully: ${info.messageId}`);

    // Log the email in our database for records
    const { error: logError } = await supabase
      .from('app_cafc148fc4d64d2595c03d028cdccef5_email_logs')
      .insert({
        to,
        subject,
        body: emailBody,
        sender_name: name || null,
        status: 'sent',
        message_id: info.messageId,
      });

    if (logError) {
      console.error(`[${requestId}] Failed to log email:`, logError);
    }

    return new Response(
      JSON.stringify({ success: true, messageId: info.messageId }),
      { 
        status: 200, 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      }
    );
  } catch (error) {
    console.error(`[${requestId}] Failed to send email:`, error);
    
    // Log the failed attempt
    try {
      await supabase
        .from('app_cafc148fc4d64d2595c03d028cdccef5_email_logs')
        .insert({
          to,
          subject,
          body: emailBody,
          sender_name: name || null,
          status: 'failed',
          error_message: error.message,
        });
    } catch (logError) {
      console.error(`[${requestId}] Failed to log email error:`, logError);
    }
    
    return new Response(
      JSON.stringify({ error: "Failed to send email", details: error.message }),
      { 
        status: 500, 
        headers: { 
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        }
      }
    );
  }
});