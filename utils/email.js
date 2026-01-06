import nodemailer from "nodemailer";

export const sendEmail = async (to, link) => {
  try {
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
      // ✅ MUST be a VERIFIED email in Brevo
      from: `"Password Reset" <chrisdiva07@gmail.com>`,
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
