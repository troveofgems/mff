const {buildHTMLBodyEmail} = require("../../../helpers/email.html.wrapper");
module.exports.setPlacedOrderEmailTemplate = (order) => {
  const
    subject = "Your Frick'n Fish Order Has Been Placed!",
    subHeader = `Your Order Reference Id Is: ${order.orderRefId}`;

  // *********************************/
  // Text Body
  // *********************************/
  let textBody = `
  ${subHeader}
  
  Dear ${order.shippingAddress.ship_to_first_name},
  
  You have successfully placed your order. So, what's next?
  
  The Frickn' Fish Staff will process this order shortly! Please allow 24-48 hours for processing.
  Once the order has been processed and shipped, you'll receive an email letting you know!
  
  Your order summary is as follows:
  ${order.cartItems.map(item => (
    `${item.quantityRequested}x\t${item.name} ${item.sizeRequested ? item.sizeRequested + "\t" : ""} ${item.hueRequested ? item.hueRequested + "\t": ""}\n\t@ ${new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(item.price * item.quantityRequested)} Total` + "\n\n "
  ))}
  
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
<h3 style="text-align: center; font-size: 2rem;">
    ${subHeader}
</h3>
<div style="font-size: 1.25rem; width: 80%; margin: 0 auto; letter-spacing: 0.10em">
    <p>Dear ${order.shippingAddress.ship_to_first_name},</p>
    <p>
        You have successfully placed your order. So, what's next?
    </p>
    <p style="line-height: 150%">
        The Frickn' Fish Staff will process this order shortly! Please allow 24-48 hours for processing.
        Once the order has been processed and shipped, you'll receive an email letting you know!
    </p>
    <p>Your order summary is as follows:</p>
    <table>
        <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Size</th>
            <th>Hue</th>
        </tr>
        ${order.cartItems.map(item => (`
          <tr>
            <td>${item.name}</td>
            <td>${new Intl.NumberFormat('en-US', {style: "currency", currency: "USD"}).format(item.price)}</td>
            <td style="text-align: center; margin: 5px 10px">${item.quantityRequested}x</td>
            <td style="margin: 5px 10px">${item.sizeRequested ? item.sizeRequested : ""}</td>
            <td style="margin: 5px 10px">${item.hueRequested ? item.hueRequested : ""}</td>
          </tr>
      `))}
    </table>
         
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