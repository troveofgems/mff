const {buildHTMLBodyEmail} = require("../../../helpers/email.html.wrapper");
module.exports.setPasswordResetEmailTemplate = (user, adminInit = false) => {
  const
    subject = "We have received your request to reset your password";

  // *********************************/
  // Text Body
  // *********************************/
  let textBody = `
  Mayday! Mayday! ${user.firstName},
  
  We received your S.O.S. to reset your account password. If you did not initiate this request, please reach out immediately. 
  Request initiated via: ${adminInit ? "MFF Site Administrator" : "Web Page"}
  
  Please follow these instructions to reset your password:
  1. Please visit this link to reset your password. Link: ${user.feresetUrl}
  
  Please don't hesitate to reach out to our support team if you need any help!
  
  Note: The link in this email will expire in 10 minutes.
  
  All The Best,
  The Frickn' Fish Team
  `;

  // *********************************/
  // HTML Body
  // *********************************/
  let htmlBody = `
  <h2 class="welcome-header" style="text-align: center; font-size: 2rem;"
>
    ${subject}
</h2>
<div style="font-size: 1.25rem; width: 80%; margin: 0 auto; letter-spacing: 0.10em">
    <p>Mayday! Mayday! ${user.firstName},</p>
    <p style="line-height: 150%">
        We received your S.O.S. to reset your account password. If you did not initiate this request, please reach out immediately.
    </p>
    <p>Request initiated via: ${adminInit ? "MFF Site Administrator" : "Web Page"}</p>
    <p style="line-height: 150%">
        Please follow these instructions to reset your password:
    </p>
    <ol>
        <li>
            Please visit <a href=${user.feresetUrl} target="_blank" rel="noreferrer noopener">this</a> link to reset your password.
        </li>
    </ol>
    <p>Please don't hesitate to reach out to our support team if you need any help!</p>
    <p>Note: The link in this email will expire in 10 minutes.</p>
</div>
<div style="font-size: 1.25rem; width: 80%; margin: 0 auto; letter-spacing: 0.10em">
    <p style="margin: 0; padding: 0;">All The Best,</p>
    <p style="margin: 0; padding: 0;">The Frickn' Fish Team</p>
</div>
  `;

  // ********************************
  // Return Email Template Artifacts
  // ********************************
  const
    emailHTMLProps = { title: subject, body: htmlBody},
    htmlTemplate = buildHTMLBodyEmail(emailHTMLProps);

  return {subject, textBody, htmlTemplate};
};