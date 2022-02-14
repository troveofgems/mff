const
  nodeMailer = require('nodemailer'),
  { setRegistrationEmailTemplate } = require('./templates/auth/registration/registration.template'),
  { setAccountLockoutEmailTemplate } = require('./templates/auth/lockout/accountLockout.template'),
  { setAccountInfoUpdatedEmailTemplate } = require('./templates/auth/accountUpdate/accountUpdated.template'),
  { setRolePromotionEmailTemplate } = require('./templates/auth/rolePromotion/rolePromotion.template'),
  { setPlacedOrderEmailTemplate } = require('./templates/order/placed/orderPlaced.template'),
  { setOrderCancelledEmailTemplate } = require('./templates/order/cancelled/orderCancelled.template'),
  { setOrderShippedEmailTemplate } = require('./templates/order/shipped/orderShipped.template'),
  { setOrderDeliveredEmailTemplate } = require('./templates/order/delivered/orderDelivered.template'),
  { setOrderRefundedEmailTemplate } = require('./templates/order/refunded/orderRefunded.template'),
  { setPasswordResetEmailTemplate } = require('./templates/auth/pwdReset/pwdReset.template');

const sendEmail = async (templateType, dataToParse) => {
  let emailTemplate = null; // create reusable transporter object using the default SMTP transport
  switch(templateType) {
    case "register":
      emailTemplate = setRegistrationEmailTemplate(dataToParse);
      break;
    case "lockout":
      emailTemplate = setAccountLockoutEmailTemplate(dataToParse);
      break;
    case "accountUpdate":
      emailTemplate = setAccountInfoUpdatedEmailTemplate(dataToParse);
      break;
    case "rolePromotion":
      emailTemplate = setRolePromotionEmailTemplate(dataToParse);
      break;
    case "passwordReset":
      emailTemplate = setPasswordResetEmailTemplate(dataToParse);
      break;
    case "orderCancelled":
      emailTemplate = setOrderCancelledEmailTemplate(dataToParse);
      break;
    case "orderDelivered":
      emailTemplate = setOrderDeliveredEmailTemplate(dataToParse);
      break;
    case "orderPlaced":
      emailTemplate = setPlacedOrderEmailTemplate(dataToParse);
      break;
    case "orderShipped":
      emailTemplate = setOrderShippedEmailTemplate(dataToParse);
      break;
    case "orderRefunded":
      emailTemplate = setOrderRefundedEmailTemplate(dataToParse);
      break;
    default:
      return null;
  }

  const transporter = nodeMailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PWD,
    },
  });

  try {
    let message ={ // send mail with defined transport object
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: dataToParse.currentEmail || dataToParse.guestEmail || (dataToParse.user && dataToParse.user.currentEmail ? dataToParse.user.currentEmail : ""), // TODO: Refine this data source
      subject: emailTemplate.subject,
      text: emailTemplate.textBody, // Plain Text Body
      html: emailTemplate.htmlTemplate, // HTML Body
    };
    console.log('Message To Send Is: ', message);
    const info = await transporter.sendMail(message);
    console.log("Message sent: %s", info.messageId);
    return info.messageId;
  } catch (err) {
    console.error('Error Sending Email: ', err);
  }
};

module.exports = {
  sendEmail
};



