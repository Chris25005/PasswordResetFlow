import SibApiV3Sdk from "sib-api-v3-sdk";

export const sendEmail = async (to, link) => {
  const client = SibApiV3Sdk.ApiClient.instance;

  const apiKey = client.authentications["api-key"];
  apiKey.apiKey = process.env.BREVO_API_KEY;

  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const emailData = {
    sender: {
      name: "Password Reset App",
      email: "chrisdiva07@gmail.com", // verified sender
    },
    to: [{ email: to }],
    subject: "Password Reset",
    htmlContent: `
      <p>Click below to reset your password:</p>
      <a href="${link}">${link}</a>
      <p>This link expires in 15 minutes.</p>
    `,
  };

  await apiInstance.sendTransacEmail(emailData);

  console.log("✅ Email sent via Brevo API");
};
