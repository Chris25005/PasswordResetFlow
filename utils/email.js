import nodemailer from "nodemailer";

export const sendEmail = async (to, link) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.BREVO_SMTP_USER,
      pass: process.env.BREVO_SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: '"Password Reset App" <noreply@passwordreset.app>',
    to,
    subject: "Password Reset",
    html: `
      <p>Click below to reset your password:</p>
      <a href="${link}">${link}</a>
      <p>Expires in 15 minutes.</p>
    `,
  });

  console.log("✅ Email sent");
};
