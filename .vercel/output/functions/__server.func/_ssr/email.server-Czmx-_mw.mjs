import { o as __toESM } from "../_runtime.mjs";
import { t as require_main } from "../_libs/dotenv.mjs";
(/* @__PURE__ */ __toESM(require_main())).config();
/**
* Main email dispatcher function using Resend's REST API.
*/
async function sendEmail({ to, subject, html }) {
	const apiKey = process.env.RESEND_API_KEY;
	if (!apiKey) {
		console.warn("RESEND_API_KEY is not set. Email simulation fallback:");
		console.log("============================================= ==============");
		console.log(`[Simulated Email]`);
		console.log(`To: ${to}`);
		console.log(`Subject: ${subject}`);
		console.log(`Body Length: ${html.length} chars`);
		console.log("============================================================");
		return {
			success: false,
			error: "RESEND_API_KEY not set"
		};
	}
	const fromEmail = process.env.RESEND_FROM_EMAIL || "WorkCred <onboarding@resend.dev>";
	try {
		const response = await fetch("https://api.resend.com/emails", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`
			},
			body: JSON.stringify({
				from: fromEmail,
				to: [to],
				subject,
				html
			})
		});
		if (!response.ok) {
			const errText = await response.text();
			console.error(`Resend API Error: ${response.status} - ${errText}`);
			throw new Error(`Failed to send email via Resend: ${errText}`);
		}
		return {
			success: true,
			data: await response.json()
		};
	} catch (error) {
		console.error("Error sending email:", error);
		throw error;
	}
}
/**
* Common HTML wrapper supporting responsive layout and premium WorkCred brand styling.
*/
function getHtmlWrapper(content) {
	return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>WorkCred</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #f8fafc;
      margin: 0;
      padding: 0;
      -webkit-font-smoothing: antialiased;
    }
    .wrapper {
      width: 100%;
      background-color: #f8fafc;
      padding: 32px 16px;
      box-sizing: border-box;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.05), 0 2px 4px -2px rgb(0 0 0 / 0.05);
      border: 1px solid #e2e8f0;
    }
    .header {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      padding: 32px;
      text-align: center;
    }
    .header h1 {
      color: #00c2ff;
      margin: 0;
      font-size: 28px;
      font-weight: 800;
      letter-spacing: -0.025em;
    }
    .header p {
      color: #94a3b8;
      margin: 8px 0 0 0;
      font-size: 14px;
    }
    .content {
      padding: 40px 32px;
      color: #334155;
      line-height: 1.6;
    }
    .content h2 {
      margin-top: 0;
      color: #0f172a;
      font-size: 20px;
      font-weight: 700;
    }
    .content p {
      margin: 16px 0;
      font-size: 16px;
    }
    .button-container {
      margin: 32px 0;
      text-align: center;
    }
    .button {
      display: inline-block;
      background: linear-gradient(90deg, #00c2ff 0%, #0072ff 100%);
      color: #ffffff !important;
      font-weight: 600;
      font-size: 15px;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 9999px;
      box-shadow: 0 10px 15px -3px rgba(0, 194, 255, 0.3);
    }
    .footer {
      background-color: #f1f5f9;
      padding: 24px 32px;
      text-align: center;
      font-size: 12px;
      color: #64748b;
      border-top: 1px solid #e2e8f0;
    }
    .footer a {
      color: #0284c7;
      text-decoration: none;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <!--[if mso]>
    <center>
    <table><tr><td width="600">
    <![endif]-->
    <div class="container">
      <div class="header">
        <h1>WorkCred</h1>
        <p>Verified Professional Reputation Platform</p>
      </div>
      <div class="content">
        ${content}
      </div>
      <div class="footer">
        <p>© ${(/* @__PURE__ */ new Date()).getFullYear()} WorkCred. All rights reserved.</p>
        <p>This is an automated security transmission. If you did not expect this request, please contact support.</p>
      </div>
    </div>
    <!--[if mso]>
    </td></tr></table>
    </center>
    <![endif]-->
  </div>
</body>
</html>
  `;
}
/**
* 1. Employee Invitation Email Template
*/
function getEmployeeInvitationHtml({ companyName, claimLink }) {
	return getHtmlWrapper(`
    <h2>You Have Been Added to WorkCred</h2>
    <p>We are excited to inform you that <strong>${companyName}</strong> has added your professional profile to the WorkCred reputation platform.</p>
    <p>By claiming your profile, you can access your professional dashboard, view and maintain your career timeline, showcase your performance reviews, and control who can access your records.</p>
    <div class="button-container">
      <a href="${claimLink}" class="button" style="color: #ffffff;">Claim Your Profile</a>
    </div>
    <p>If you have trouble with the button above, copy and paste the link below into your browser:</p>
    <p style="font-size: 13px; word-break: break-all; color: #0284c7;"><a href="${claimLink}">${claimLink}</a></p>
  `);
}
/**
* 2. Welcome Registration Email Template
*/
function getWelcomeEmailHtml({ fullName }) {
	return getHtmlWrapper(`
    <h2>Welcome to WorkCred, ${fullName}!</h2>
    <p>Thank you for creating your account on WorkCred. We are thrilled to have you join our verified professional network.</p>
    <p>Your workspace is now ready. Log in to start verifying credentials, managing employee reviews, or sharing your verified career history securely.</p>
    <div class="button-container">
      <a href="${`${process.env.APP_URL || "http://localhost:3000"}/auth/login`}" class="button" style="color: #ffffff;">Access Workspace</a>
    </div>
    <p>We look forward to helping you build and protect your professional reputation.</p>
  `);
}
/**
* 3. Password Reset Email Template
*/
function getPasswordResetHtml({ fullName, resetLink }) {
	return getHtmlWrapper(`
    <h2>Reset Your WorkCred Password</h2>
    <p>Hello ${fullName},</p>
    <p>We received a request to reset the password for your WorkCred account. Click the button below to set a new password:</p>
    <div class="button-container">
      <a href="${resetLink}" class="button" style="color: #ffffff;">Reset Password</a>
    </div>
    <p>This password reset link is valid for <strong>1 hour</strong>. If you did not request a password reset, please ignore this email; your password will remain secure.</p>
    <p>If you have trouble with the button above, copy and paste the link below into your browser:</p>
    <p style="font-size: 13px; word-break: break-all; color: #0284c7;"><a href="${resetLink}">${resetLink}</a></p>
  `);
}
/**
* 4. Verification Request Email Template
*/
function getVerificationRequestHtml({ employeeName, companyName, requestType }) {
	return getHtmlWrapper(`
    <h2>New Verification Request</h2>
    <p>Hello ${employeeName},</p>
    <p>A verifying organization, <strong>${companyName}</strong>, has requested access to verify your <strong>${requestType}</strong> credentials on WorkCred.</p>
    <p>Under our strict privacy guidelines, no credentials will be shared until you explicitly grant access. Please review this request on your dashboard:</p>
    <div class="button-container">
      <a href="${`${process.env.APP_URL || "http://localhost:3000"}/app/dashboard`}" class="button" style="color: #ffffff;">Review Request</a>
    </div>
    <p>You can grant or deny this request at any time from your Consent Manager.</p>
  `);
}
/**
* 5. Company Approval Email Template
*/
function getCompanyApprovalHtml({ creatorName, companyName }) {
	return getHtmlWrapper(`
    <h2>Your Company Has Been Approved!</h2>
    <p>Hello ${creatorName},</p>
    <p>We are pleased to inform you that your company registration request for <strong>${companyName}</strong> has been reviewed and <strong>approved</strong> by our team.</p>
    <p>Your company profile is now fully verified. You can log in to your dashboard to start inviting team members, managing verifications, and logging employee records.</p>
    <div class="button-container">
      <a href="${`${process.env.APP_URL || "http://localhost:3000"}/auth/login`}" class="button" style="color: #ffffff;">Log In to Dashboard</a>
    </div>
    <p>Welcome to the WorkCred verified network!</p>
  `);
}
/**
* 6. Company Rejection Email Template
*/
function getCompanyRejectionHtml({ creatorName, companyName }) {
	return getHtmlWrapper(`
    <h2>Company Registration Request - WorkCred</h2>
    <p>Hello ${creatorName},</p>
    <p>Thank you for submitting a registration request for <strong>${companyName}</strong> on WorkCred.</p>
    <p>After careful review of the provided credentials, we regret to inform you that we are unable to approve your company registration at this time.</p>
    <p>If you believe this was in error or if you wish to provide additional documentation, please reach out to our verification support team.</p>
  `);
}
/**
* 7. Employee Status Update Email Template
*/
function getEmployeeStatusUpdateHtml({ employeeName, companyName, status }) {
	return getHtmlWrapper(`
    <h2>Your Employment Status Has Been Updated</h2>
    <p>Hello ${employeeName},</p>
    <p>We are notifying you that your employment status at <strong>${companyName}</strong> has been updated to <strong>${status === "active" ? "Active" : status === "on_leave" ? "Suspended (On Leave)" : "Exited"}</strong>.</p>
    <p>If you have any questions regarding this change, please contact your company's HR administrator.</p>
  `);
}
/**
* 8. Employee Profile Deleted Email Template
*/
function getEmployeeDeletionHtml({ employeeName, companyName }) {
	return getHtmlWrapper(`
    <h2>Your WorkCred Profile Has Been Removed</h2>
    <p>Hello ${employeeName},</p>
    <p>This is to notify you that your employment profile associated with <strong>${companyName}</strong> has been permanently removed from the WorkCred platform.</p>
    <p>Your associated records and credentials for this tenure are no longer accessible.</p>
  `);
}
//#endregion
export { getCompanyApprovalHtml, getCompanyRejectionHtml, getEmployeeDeletionHtml, getEmployeeInvitationHtml, getEmployeeStatusUpdateHtml, getPasswordResetHtml, getVerificationRequestHtml, getWelcomeEmailHtml, sendEmail };
