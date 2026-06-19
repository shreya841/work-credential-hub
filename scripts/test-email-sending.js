import * as dotenv from "dotenv";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, "../.env") });

const apiKey = process.env.RESEND_API_KEY;
if (!apiKey) {
  console.error("ERROR: RESEND_API_KEY is not defined in the .env file.");
  process.exit(1);
}

const toEmail = process.argv[2];
if (!toEmail) {
  console.error("ERROR: Please specify a recipient email address as an argument.");
  console.error("Usage: node scripts/test-email-sending.js recipient@example.com");
  process.exit(1);
}

const fromEmail = process.env.RESEND_FROM_EMAIL || "WorkCred <onboarding@resend.dev>";

async function testSend() {
  console.log("Sending test email using Resend...");
  console.log(`From: ${fromEmail}`);
  console.log(`To: ${toEmail}`);

  const htmlContent = `
    <h2>Resend Email Connectivity Verification</h2>
    <p>This email confirms that the real email delivery system is working successfully using Resend.</p>
    <p>The following features are now fully integrated and operational:</p>
    <ul>
      <li><strong>Employee Profile Claiming Invitation</strong></li>
      <li><strong>Welcome User Registration</strong></li>
      <li><strong>Secure Password Reset</strong></li>
      <li><strong>Credential Verification Requests</strong></li>
      <li><strong>Company Approval notifications</strong></li>
      <li><strong>Company Rejection alerts</strong></li>
    </ul>
    <div style="margin: 32px 0; text-align: center;">
      <a href="http://localhost:8081" style="display: inline-block; background: linear-gradient(90deg, #00c2ff 0%, #0072ff 100%); color: #ffffff !important; font-weight: 600; font-size: 15px; padding: 14px 32px; text-decoration: none; border-radius: 9999px; box-shadow: 0 10px 15px -3px rgba(0, 194, 255, 0.3);">Go to WorkCred</a>
    </div>
  `;

  const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WorkCred Test</title>
  <style>
    body { font-family: -apple-system, sans-serif; background-color: #f8fafc; margin: 0; padding: 32px 16px; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.05); }
    .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 32px; text-align: center; color: #00c2ff; }
    .content { padding: 40px 32px; color: #334155; line-height: 1.6; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header"><h1>WorkCred Test</h1></div>
    <div class="content">${htmlContent}</div>
  </div>
</body>
</html>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: "WorkCred - Real Email Delivery Test",
        html: fullHtml,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Resend API HTTP error ${response.status}: ${errText}`);
    }

    const data = await response.json();
    console.log("SUCCESS: Email successfully sent via Resend API!");
    console.log("Resend Response Details:", data);
  } catch (error) {
    console.error("FAILED to send test email:", error.message);
    process.exit(1);
  }
}

testSend();
