const {buildHTMLBodyEmail} = require("../../../helpers/email.html.wrapper");
module.exports.setOrderShippedEmailTemplate = order => { // TODO: Come back and only provide data needed...
  const
    subject = `Your Frick'n Fish Order Has Been Shipped! Order RefId#: ${order.orderRefId}`;

  // *********************************/
  // Text Body
  // *********************************/
  let textBody = `
  Dear ${order.shippingAddress.ship_to_first_name},
  
  Your order has been shipped!! So, what's next?
  
  Be on the lookout for your package as it's on the way!
  
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
    <p>Dear ${order.shippingAddress.ship_to_first_name}</p>
    <p style="line-height: 150%">
        Your order has been shipped!! So, what's next?
    </p>
    <p style="line-height: 150%">
        Be on the lookout for your package as it's on the way!
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