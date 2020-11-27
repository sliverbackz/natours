const nodemailer = require('nodemailer');

const sendGmail = async (options) => {
  //1) Create a transporter
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD,
    },
    //Activate in gmail "less secure app" option
  });
  //2) Define the email options
  const mailOptions = {
    from: 'Zin Min Tun <zinmt123@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };
  //3) Actually send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendGmail;
