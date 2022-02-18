const {buildHTMLBodyEmail} = require("../../../helpers/email.html.wrapper");

module.exports.setRegistrationEmailTemplate = ({firstName}) => {
  const
    subject = "Welcome To Frickn' Fish!"

  // *********************************/
  // Text Body
  // *********************************/
  let textBody = `
  Hi ${firstName} & Welcome!
  
  You have successfully registered an account with Frickn' Fish!
  Now you can make faster purchases, track those purchases, as well as change your user account
  information and account settings. You can also cancel any of your orders that have not yet been shipped.
  
  We hope you enjoy your stay at Frickn' Fish!
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
    Welcome To Frickn' Fish!
</h2>
<div style="font-size: 1.25rem; width: 80%; margin: 0 auto; letter-spacing: 0.10em">
    <p>Hi ${firstName} & Welcome!</p>
    <p>You have successfully registered an account with Frickn' Fish!</p>
    <p style="line-height: 150%">
        Now you can make faster purchases, track those purchases, as well as change your user account
        information and account settings. You can also cancel any of your orders that have not yet been shipped.
    </p>
    <p>We hope you enjoy your stay at Frickn' Fish!</p>
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