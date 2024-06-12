// nodemailer.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "noorf3531@gmail.com", // Your Gmail email address
        pass: "kkft wymp ygln vhlt" // Your Gmail password
    }
});

const mailOptions = {
    from: "noorf3531@gmail.com",
    to: "lostsoul3531@gmail.com",
    subject: "Test Email",
    text: "This is a test email sent from Node.js using Nodemailer"
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.error(error);
    } else {
        console.log("Email sent: " + info.response);
    }
});
2