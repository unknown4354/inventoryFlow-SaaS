import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const emailFrom = process.env.EMAIL_FROM || 'noreply@inventoryflow.com'
const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export async function sendVerificationEmail(email: string, token: string) {
  const verificationUrl = `${appUrl}/verify-email?token=${token}`

  try {
    await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: 'Verify your email address',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 32px;
              }
              .logo {
                font-size: 24px;
                font-weight: 700;
                color: #000000;
                margin-bottom: 24px;
              }
              h1 {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 16px;
                color: #111827;
              }
              p {
                margin-bottom: 16px;
                color: #6b7280;
              }
              .button {
                display: inline-block;
                background: #000000;
                color: #ffffff;
                padding: 12px 32px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 500;
                margin: 24px 0;
              }
              .button:hover {
                box-shadow: 0 0 20px rgba(234, 88, 12, 0.3);
              }
              .footer {
                margin-top: 32px;
                padding-top: 24px;
                border-top: 1px solid #e5e7eb;
                font-size: 14px;
                color: #9ca3af;
              }
              .link {
                color: #ea580c;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">InventoryFlow</div>
              <h1>Verify your email address</h1>
              <p>Thanks for signing up for InventoryFlow! Please verify your email address by clicking the button below.</p>
              <a href="${verificationUrl}" class="button">Verify Email Address</a>
              <p>Or copy and paste this link into your browser:</p>
              <p><a href="${verificationUrl}" class="link">${verificationUrl}</a></p>
              <div class="footer">
                <p>If you didn't create an account with InventoryFlow, you can safely ignore this email.</p>
                <p>This link will expire in 24 hours.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Error sending verification email:', error)
    return { success: false, error }
  }
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const resetUrl = `${appUrl}/reset-password?token=${token}`

  try {
    await resend.emails.send({
      from: emailFrom,
      to: email,
      subject: 'Reset your password',
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <style>
              body {
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .container {
                background: #ffffff;
                border: 1px solid #e5e7eb;
                border-radius: 8px;
                padding: 32px;
              }
              .logo {
                font-size: 24px;
                font-weight: 700;
                color: #000000;
                margin-bottom: 24px;
              }
              h1 {
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 16px;
                color: #111827;
              }
              p {
                margin-bottom: 16px;
                color: #6b7280;
              }
              .button {
                display: inline-block;
                background: #000000;
                color: #ffffff;
                padding: 12px 32px;
                border-radius: 6px;
                text-decoration: none;
                font-weight: 500;
                margin: 24px 0;
              }
              .button:hover {
                box-shadow: 0 0 20px rgba(234, 88, 12, 0.3);
              }
              .footer {
                margin-top: 32px;
                padding-top: 24px;
                border-top: 1px solid #e5e7eb;
                font-size: 14px;
                color: #9ca3af;
              }
              .link {
                color: #ea580c;
                text-decoration: none;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="logo">InventoryFlow</div>
              <h1>Reset your password</h1>
              <p>We received a request to reset your password. Click the button below to choose a new password.</p>
              <a href="${resetUrl}" class="button">Reset Password</a>
              <p>Or copy and paste this link into your browser:</p>
              <p><a href="${resetUrl}" class="link">${resetUrl}</a></p>
              <div class="footer">
                <p>If you didn't request a password reset, you can safely ignore this email. Your password will not be changed.</p>
                <p>This link will expire in 1 hour.</p>
              </div>
            </div>
          </body>
        </html>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Error sending password reset email:', error)
    return { success: false, error }
  }
}
