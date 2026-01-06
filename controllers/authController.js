import User from "../models/User.js";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/email.js";

/* ======================================================
   FORGOT PASSWORD
   ====================================================== */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await User.findOne({ email });

    // 🔒 SECURITY: Do NOT reveal whether email exists
    if (!user) {
      return res.status(200).json({
        message: "If this email exists, a reset link has been sent",
      });
    }

    // Generate secure token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hash token before storing
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

    await user.save();

    // Reset link
    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Send email (Brevo API)
    await sendEmail(user.email, resetLink);

    return res.status(200).json({
      message: "Password reset link sent to email",
    });
  } catch (error) {
    console.error("❌ Forgot Password Error:", error);

    return res.status(500).json({
      message: "Failed to send reset email. Please try again later.",
    });
  }
};

/* ======================================================
   RESET PASSWORD
   ====================================================== */
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired reset token",
      });
    }

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successful",
    });
  } catch (error) {
    console.error("❌ Reset Password Error:", error);

    return res.status(500).json({
      message: "Password reset failed",
    });
  }
};
