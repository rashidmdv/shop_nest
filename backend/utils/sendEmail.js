const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    let receverEmail = to;
    if (process.env.APP_ENV === "local") {
      receverEmail = process.env.PERSONAL_EMAIL;
    }
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: receverEmail,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
