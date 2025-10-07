const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.GOOGLE_APP_EMAIL,          
        pass: process.env.GOOGLE_APP_PASSWORD, 
    },
    tls: {
        rejectUnauthorized: false 
    }
});

const sendEmail = async (to, subject, text) => {
    try {
        const mailOptions = {
            from: process.env.GOOGLE_APP_EMAIL, 
            to,
            subject,
            text,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log("Email sent: " + info.response);
    } catch (error) {
        console.error("Error sending email:", error.message);
        throw error; 
    }
};

module.exports = sendEmail;
