import nodemailer from "nodemailer";

export const sendEmail = async (to, link) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER, // xxxx@smtp-brevo.com
        pass: process.env.BREVO_SMTP_PASS, // xsmtpsib-****
      },
    });

    await transporter.sendMail({
      from: `"Password Reset" <chrisdiva07@gmail.com>`, // ✅ VERIFIED EMAIL
      to,
      subject: "Password Reset",
      html: `
        <p>Click below to reset your password:</p>
        <a href="${link}">${link}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });

    console.log("✅ Password reset email sent");
  } catch (error) {
    console.error("❌ Email send failed:", error.message);
    throw error;
  }
};
