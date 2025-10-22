import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

// Transporteur SMTP Gmail
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: parseInt(process.env.MAIL_PORT),
  secure: process.env.MAIL_SECURE === "true", // true = SSL/TLS
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// Fonction d’envoi d’e-mail
export const sendEmail = async ({ to, subject, text, html }) => {
  try {
    await transporter.sendMail({
      from: `"Trouver mon artisan" <${process.env.MAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });
    console.log(`✅ Email envoyé à ${to}`);
  } catch (err) {
    console.error("❌ Erreur envoi email :", err.message);
    throw err;
  }
};
