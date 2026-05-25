import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const smtpLogin = process.env.BREVO_SMTP_LOGIN;
    const senderEmail = process.env.BREVO_SENDER_EMAIL || 'vulnsage2026@gmail.com';
    const senderName = process.env.BREVO_SENDER_NAME || 'VulnSage Security';
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'sambhavmehra07@gmail.com';

    if (!apiKey) {
      return NextResponse.json({ 
        error: 'Brevo API/SMTP key is missing. Please check your .env configuration.' 
      }, { status: 500 });
    }

    // METHOD 1: If SMTP Login is provided, use SMTP (Nodemailer)
    if (smtpLogin) {
      console.log('Sending email using Brevo SMTP...');
      const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
          user: smtpLogin,
          pass: apiKey,
        },
      });

      const mailOptions = {
        from: `"${name} (via ${senderName})" <${senderEmail}>`,
        to: receiverEmail,
        replyTo: email,
        subject: `New Portfolio Contact Message from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
            <h3>New Message from Portfolio</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      };

      await transporter.sendMail(mailOptions);
      return NextResponse.json({ success: true, message: 'Message sent successfully via SMTP' }, { status: 200 });
    } 
    
    // METHOD 2: Otherwise, use the Brevo Transactional Email HTTP API
    else {
      console.log('Sending email using Brevo HTTP API...');
      const emailPayload = {
        sender: {
          name: senderName,
          email: senderEmail,
        },
        to: [
          {
            email: receiverEmail,
            name: "Sambhav Mehra",
          }
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: `New Portfolio Contact Message from ${name}`,
        textContent: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        htmlContent: `
          <h3>New Message from Portfolio</h3>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong></p>
          <p>${message.replace(/\n/g, '<br>')}</p>
        `,
      };

      const response = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'api-key': apiKey,
          'content-type': 'application/json',
        },
        body: JSON.stringify(emailPayload),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error('Brevo API Error:', errorData);
        return NextResponse.json({ 
          error: errorData.message || 'Failed to send email via Brevo API.' 
        }, { status: response.status });
      }

      return NextResponse.json({ success: true, message: 'Message sent successfully via API' }, { status: 200 });
    }
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
