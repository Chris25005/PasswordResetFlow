import SibApiV3Sdk from "sib-api-v3-sdk";

export const sendEmail = async (to, link) => {
  try {
    const client = SibApiV3Sdk.ApiClient.instance;

    // 🔑 Brevo API key
    client.authentications["api-key"].apiKey =
      process.env.BREVO_API_KEY;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    const email = {
      sender: {
        name: "Password Reset App",
        email: "chrisdiva07@gmail.com", // must be VERIFIED sender
      },
      to: [{ email: to }],
      subject: "Reset Your Password",
      htmlContent: `
        <p>You requested a password reset.</p>
        <p>
          <a href="${link}" target="_blank">
            Click here to reset your password
          </a>
        </p>
        <p>This link expires in 15 minutes.</p>
      `,
    };

    await apiInstance.sendTransacEmail(email);

    console.log("✅ Password reset email sent via Brevo API");
  } catch (error) {
    console.error(
      "❌ Brevo API Email Error:",
      error?.response?.body || error.message
    );
    throw error;
  }
};
