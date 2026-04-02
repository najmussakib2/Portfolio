import { Resend } from 'resend'

export const resend = new Resend(process.env.RESEND_API_KEY!)

// ─── Email Templates ──────────────────────────────────────────────────────────

export function contactEmailHtml({
  name,
  email,
  subject,
  message,
}: {
  name: string
  email: string
  subject: string
  message: string
}) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Contact Message</title>
      </head>
      <body style="font-family: 'Segoe UI', sans-serif; background: #f9f9f9; margin: 0; padding: 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
                <!-- Header -->
                <tr>
                  <td style="background: #0f0f0f; padding: 32px 40px;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">
                      📬 New Message from Portfolio
                    </h1>
                  </td>
                </tr>
                <!-- Body -->
                <tr>
                  <td style="padding: 40px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 24px; border-bottom: 1px solid #f0f0f0;">
                          <p style="margin: 0 0 4px; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">From</p>
                          <p style="margin: 0; font-size: 16px; color: #0f0f0f; font-weight: 600;">${name}</p>
                          <a href="mailto:${email}" style="color: #6366f1; font-size: 14px;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 24px 0; border-bottom: 1px solid #f0f0f0;">
                          <p style="margin: 0 0 4px; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Subject</p>
                          <p style="margin: 0; font-size: 16px; color: #0f0f0f; font-weight: 600;">${subject}</p>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding-top: 24px;">
                          <p style="margin: 0 0 12px; font-size: 12px; color: #999; text-transform: uppercase; letter-spacing: 1px;">Message</p>
                          <div style="background: #f9f9f9; border-radius: 8px; padding: 20px; font-size: 15px; color: #333; line-height: 1.7; white-space: pre-wrap;">${message}</div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <!-- Footer -->
                <tr>
                  <td style="background: #f9f9f9; padding: 20px 40px; text-align: center;">
                    <p style="margin: 0; font-size: 12px; color: #999;">
                      Sent from your portfolio contact form
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}

export function autoReplyHtml({ name }: { name: string }) {
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Message Received</title>
      </head>
      <body style="font-family: 'Segoe UI', sans-serif; background: #f9f9f9; margin: 0; padding: 40px 0;">
        <table width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" style="background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
                <tr>
                  <td style="background: #0f0f0f; padding: 32px 40px;">
                    <h1 style="color: #ffffff; margin: 0; font-size: 20px; font-weight: 600;">
                      Thanks for reaching out, ${name}!
                    </h1>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 40px;">
                    <p style="font-size: 16px; color: #333; line-height: 1.7;">
                      I've received your message and will get back to you as soon as possible — usually within 24–48 hours.
                    </p>
                    <p style="font-size: 16px; color: #333; line-height: 1.7;">
                      In the meantime, feel free to check out my work on GitHub or connect with me on LinkedIn.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td style="background: #f9f9f9; padding: 20px 40px; text-align: center;">
                    <p style="margin: 0; font-size: 12px; color: #999;">This is an automated reply.</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `
}
