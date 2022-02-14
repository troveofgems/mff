const {buildHTMLBodyEmail} = require("../../../helpers/email.html.wrapper");
module.exports.setAccountInfoUpdatedEmailTemplate = (user) => {
  const
    subject = "Your Frick'n Fish Account Has Been Updated";

  // *********************************/
  // Text Body
  // *********************************/
  let textBody = `
  Dear ${user.firstName},
  
  We noticed an update was made to your account information and wanted to verify that with you for security 
  purposes. If you updated your account, please disregard this email. 
  
  ${user.adminUpdate ? (
    "If you did not ask a Site Administrator to update your account, please reach out to the Frickn' Fish support " +
    `staff immediately. The last update to your account was made on: ${user.updatedAt}.`
  ) : (
    "If you did not update your account, please reach out to the Frickn' Fish support staff immediately." +
    `The last update to your account was made on: ${user.updatedAt}.`  
  )}
  
  
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
    <p>Dear ${user.firstName}</p>
    <p style="line-height: 150%">
        We noticed an update was made to your account information and wanted to verify for security 
        purposes. If you updated your account, please disregard this email.
    </p>
    ${user.adminUpdate ? (
      `<p style="line-height: 150%">
        If you did not ask a Site Administrator to update your account, please reach out to the Frickn' Fish support
        staff immediately. The last update to your account was made on: ${user.updatedAt}.
      </p>`) : (`<p style="line-height: 150%">
        If you did not update your account, please reach out to the Frickn' Fish support staff immediately.
        The last update to your account was made on: ${user.updatedAt}.
      </p>`)}
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