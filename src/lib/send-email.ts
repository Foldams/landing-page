import { supabase } from './supabase';

interface EmailOptions {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  replyTo?: string;
  from?: string;
}

/**
 * Sends an email using the Supabase Edge Function
 * @param options Email options including to, subject, text/html content
 * @returns Promise with the result of the email send operation
 */
export async function sendEmail(options: EmailOptions): Promise<{ success: boolean; messageId?: string; error?: string }> {
  try {
    // Validate required fields
    if (!options.to || !options.subject || (!options.text && !options.html)) {
      throw new Error('Missing required email fields: to, subject, and text or html content');
    }

    console.log('Sending email to:', options.to);
    
    // Call the Supabase Edge Function
    const { data, error } = await supabase.functions.invoke(
      'app_756f9e3ca9454cb782f1af778d02d691_send_email',
      {
        body: JSON.stringify(options),
      }
    );

    if (error) {
      console.error('Edge function error:', error);
      return { success: false, error: error.message || 'Failed to send email' };
    }

    console.log('Email sent successfully:', data);
    return { 
      success: true, 
      messageId: data?.messageId || undefined
    };
  } catch (e) {
    console.error('Error sending email:', e);
    return { 
      success: false, 
      error: e instanceof Error ? e.message : 'Unknown error sending email' 
    };
  }
}

/**
 * Sends a welcome email to a new subscriber
 * @param email The email address of the new subscriber
 * @param name Optional name of the subscriber
 * @returns Promise with the result of the email send operation
 */
export async function sendWelcomeEmail(email: string, name?: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const greeting = name ? `Hello ${name},` : 'Hello,';

  return sendEmail({
    to: email,
    subject: 'Welcome to Foldams Newsletter',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">Welcome to Foldams Newsletter</h2>
        <p>${greeting}</p>
        <p>Thank you for subscribing to our newsletter. We're excited to keep you updated with our latest news, services, and offers.</p>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f7f7f7; border-left: 4px solid #4a6cf7;">
          <p>You'll receive updates about:</p>
          <ul>
            <li>Foldams Logistics: Canadian logistics operations</li>
            <li>FDM Autos: Vehicle and spare parts exports</li>
            <li>Foldams Food: Food production and distribution</li>
          </ul>
        </div>
        
        <p>If you have any questions, feel free to contact us at <a href="mailto:support@foldams.com">support@foldams.com</a>.</p>
        
        <p>Best regards,<br>The Foldams Team</p>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; font-size: 12px; color: #666;">
          <p>If you wish to unsubscribe, please reply to this email with "UNSUBSCRIBE" in the subject line.</p>
        </div>
      </div>
    `,
  });
}

/**
 * Sends a contact form submission notification to the admin
 * @param name Name from the contact form
 * @param email Email from the contact form
 * @param message Message from the contact form
 * @returns Promise with the result of the email send operation
 */
export async function sendContactFormNotification(name: string, email: string, message: string): Promise<{ success: boolean; messageId?: string; error?: string }> {
  return sendEmail({
    to: 'support@foldams.com', // Admin email
    subject: 'New Contact Form Submission',
    replyTo: email,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
        <h2 style="color: #333;">New Contact Form Submission</h2>
        
        <div style="margin: 20px 0; padding: 15px; background-color: #f7f7f7; border-left: 4px solid #4a6cf7;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
        
        <p>You can reply directly to this email to respond to the sender.</p>
      </div>
    `,
  });
}