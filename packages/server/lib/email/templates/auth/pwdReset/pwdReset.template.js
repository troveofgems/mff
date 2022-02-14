const {buildHTMLBodyEmail} = require("../../../helpers/email.html.wrapper");
module.exports.setPasswordResetEmailTemplate = ({firstName}) => {
  const
    subject = "We have received your request to reset your password";

  // *********************************/
  // Text Body
  // *********************************/
  let textBody = `
  Dear ${firstName},
  
  Frickn' Fish staff received a request to reset your account password. If you did not initiate this request,
  please reach out immediately. Otherwise,
  
  Here are the instructions to reset your password:
  1. Please visit this link to reset your password. Link: #someDomain
  
  Please don't hesitate to reach out to our support team if you need any help!
  
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
    <p>Dear ${firstName}</p>
    <p style="line-height: 150%">
        Frickn' Fish staff received a request to reset your account password. If you did not initiate this request,
        please reach out immediately. Otherwise,
    </p>
    <p style="line-height: 150%">
        Here are the instructions to reset your password:
    </p>
    <ol>
        <li>
            Please visit this <a href="#someDomain">link</a> to reset your password.
        </li>
    </ol>
    <p>Please don't hesitate to reach out to our support team if you need any help!</p>
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