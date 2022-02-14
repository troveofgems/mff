const {buildHTMLBodyEmail} = require("../../../helpers/email.html.wrapper");
module.exports.setRolePromotionEmailTemplate = (user) => {
  const
    subject = "Your Frick'n Fish Account Role Has Been Elevated";

  // *********************************/
  // Text Body
  // *********************************/
  let textBody = `
${user.authLevel !== 1000 ? (`
Dear ${user.firstName},
Congratulations! your account privileges have been expanded. Please treat this new-found power with respect.
`) : ""}  

${user.authLevel === 100 ? (`
You are now a Site Administrator. Welcome! For training, please reach out to Michael At Frickn' Fish
`) : (user.authLevel === 1000 ? (`
Hello, and a very warm welcome ${user.firstName}. 

You have been granted the special role of Auditor by the application manager. 
I sincerely hope you enjoy your visit to my MERN Stack driven Web Application: Frickn' Fish. 

As an Auditor, you have been granted read-only site admin privileges so that you can review any
number of rich features offered by the Web Application - and more importantly help you decide if I'm the 
Software Developer that you want to bring onto your team. 
    
Please let me know if you have any questions, concerns, or find any bugs. I'm always happy to have a discussion
and or demonstration about any of the features that you've seen on this site.
    
Your time is important and I appreciate that,
All the best,
Dustin K Greco
`) : "")}
  
${user.authLevel !== 1000 ? (`
Please don't hesitate to reach out to our support team if you need any help!

All The Best,
Your New Team!
`) : ""}
`;

  // *********************************/
  // HTML Body
  // *********************************/
  let htmlBody = `
<h2 class="welcome-header" style="text-align: center; font-size: 2rem;">
    ${subject}
</h2>
<div style="font-size: 1.25rem; width: 80%; margin: 0 auto; letter-spacing: 0.10em">
${user.authLevel !== 1000 ? (`
<p>
Dear ${user.firstName},
Congratulations! your account privileges have been expanded. Please treat this new-found power with respect.
</p>
`) : ""}
${user.authLevel === 100 ? (`<p>
You are now a Site Administrator. Welcome! For training, please reach out to Michael At Frickn' Fish
</p>`) : (user.authLevel === 1000 ? (`<div>
<p>
Hello, and a very warm welcome ${user.firstName}. 
</p>
<p>
You have been granted the special role of Auditor by the application manager.
</p>
<p>
I sincerely hope you enjoy your visit to my MERN-stack driven web application: Frickn' Fish.
</p>
<p>
As an Auditor, you have been granted read-only site admin privileges so that you can review any
number of rich features offered by the Web Application - and more importantly help you decide if I'm the 
Software Developer or Architect that you want to bring onto your team. 
</p>
<p>
Would you like to push some test orders through the system? No worries: Just use the following Paypal Credentials
and stick to the default selections at checkout.
</p>
<ol>
  <li>Paypal Username: sb-7epv4712465498@personal.example.com</li>
  <li>Paypal Password: 1&@skQ4u</li>
</ol>
<p>
Please let me know if you have any questions, concerns, or find any bugs. I'm always happy to have a discussion
and or demonstration about any of the features that you've seen on this site.
</p>
<p>
Your time is important and I appreciate that,
</p>
<p>
All the best,
</p>
<p>
Dustin K Greco
</p>
</div>`) : "")}  
</div>
${user.authLevel !== 1000 ? (`
<div style="font-size: 1.25rem; width: 80%; margin: 0 auto; letter-spacing: 0.10em">
    <p>Please don't hesitate to reach out to our support team if you need any help!</p>
    <p style="margin: 0; padding: 0;">All The Best,</p>
    <p style="margin: 0; padding: 0;">Your New Team!</p>
</div>
`) : ""}
`;

  // ********************************
  // Return Email Template Artifacts
  // ********************************
  const
    emailHTMLProps = { title: subject, body: htmlBody},
    htmlTemplate = buildHTMLBodyEmail(emailHTMLProps);

  return {subject, textBody, htmlTemplate};
};