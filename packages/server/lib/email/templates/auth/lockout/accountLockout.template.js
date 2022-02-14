const {buildHTMLBodyEmail} = require("../../../helpers/email.html.wrapper");
module.exports.setAccountLockoutEmailTemplate = ({firstName, updatedAt}) => {
  const
    subject = "Your Frick'n Fish Account Has Been Locked";

  // *********************************/
  // Text Body
  // *********************************/
  let textBody = `
  Dear ${firstName},
  
  We noticed that there were three (3) failed attempts at logging into your account, the last known attempt being:
  ${updatedAt}.
  
  For Security reasons we have locked your account. If you did not attempt these logins please let us know immediately. 
  Otherwise you can reset your password by going to the forgotten password page and filling out the form there.
  
  We appreciate your business with Frickn' Fish!
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
    <p>Dear ${firstName},</p>
    <p>
        We noticed that there were three (3) failed attempts at logging into your account, 
        the last known attempt being: ${updatedAt}.
    </p>
    <p style="line-height: 150%">
        For Security reasons we have locked your account. If you did not attempt these logins please let us 
        know immediately. Otherwise, you can reset your password by going to the forgotten password page and filling 
        out the form there.
    </p>
    <p>We appreciate your business with Frickn' Fish!</p>
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