import nodemailer from "nodemailer";

export const sendEmail = async (to, link) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.BREVO_SMTP_HOST,
      port: Number(process.env.BREVO_SMTP_PORT),
      secure: false,
      auth: {
        user: process.env.BREVO_SMTP_USER, // apikey
        pass: process.env.BREVO_SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // local dev only
      },
    });

    await transporter.sendMail({
      from: `"Recipes App" <noreply@recipesapp.com>`,
      to,
      subject: "Password Reset",
      html: `
        <p>Click the link below to reset your password:</p>
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
