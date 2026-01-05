import nodemailer from "nodemailer";

export const sendEmail = async (to, link) => {
  const transporter = nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false, // MUST be false for 587
    auth: {
      user: process.env.BREVO_SMTP_USER, // 9f3694001@smtp-brevo.com
      pass: process.env.BREVO_SMTP_PASS, // xsmtpsib-xxxx
    },
    tls: {
      rejectUnauthorized: false, // ✅ FIXES self-signed cert error (LOCAL ONLY)
    },
  });

  await transporter.sendMail({
    from: `"Recipes App" <chrisdiva07@gmail.com>`,
    to,
    subject: "Password Reset",
    html: `
      <p>Click the link below to reset your password:</p>
      <a href="${link}">${link}</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });

  console.log("✅ Password reset email sent");
};
