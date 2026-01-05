import nodemailer from "nodemailer";

export const sendEmail = async (to, link) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: "noreply@passwordreset.com",
    to,
    subject: "Password Reset",
    html: `<a href="${link}">Reset Password</a>`,
  });
};
