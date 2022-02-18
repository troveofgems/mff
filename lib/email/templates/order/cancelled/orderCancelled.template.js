const {buildHTMLBodyEmail} = require("../../../helpers/email.html.wrapper");
module.exports.setOrderCancelledEmailTemplate = (order) => {
  console.log("Inside Email Cancelled!!", order);
  const
    subject = `Your Frick'n Fish Order Has Been Cancelled - Order RefId#: ${order.orderRefId}`;

  // *********************************/
  // Text Body
  // *********************************/
  let textBody = `
  Dear ${order.shippingAddress.ship_to_first_name},
  
  Order: ${order.orderRefId} has successfully been cancelled. So, what's next?
  
  The Frickn' Fish Staff will process begin to process your refund after a review. 
  Please allow 24-48 hours for processing. Once the refund has been processed, 
  you'll receive an email letting you know.
  
  We're sorry to have had to cancel the order.
  
  We appreciate your business with Frickn' Fish and if you have any comments or concerns we'd love to hear back
  from you. Especially if you cancelled due to product dissatisfaction.
  
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
    <p>
        Order: ${order.orderRefId} has successfully been cancelled. So, what's next?
    </p>
    <p style="line-height: 150%">
        The Frickn' Fish Staff will process begin to process your refund after a review. 
        Please allow 24-48 hours for processing. Once the refund has been processed, 
        you'll receive an email letting you know.
    </p>
    <p>We're sorry to have had to cancel the order.</p>
    
    <p>
      We appreciate your business with Frickn' Fish and if you have any comments or concerns we'd love to hear back
      from you. Especially if you cancelled due to product dissatisfaction.
    </p>
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