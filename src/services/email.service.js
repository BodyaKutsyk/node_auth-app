const nodemailer = require('nodemailer');

require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const sendMail = (to, html) => {
  return transporter.sendMail({
    from: `Auth app <${process.env.SMTP_USER}>`,
    to,
    subject: 'Hello!',
    html: `<b>${html}</b>`,
  });
};

const sendVerificationEmail = (email, token) => {
  const href = `${process.env.BASE}/activate/${token}`;
  const html = `
  <h1>Please, activate your email!</h1>
  <a href="${href}">${href}</a>
  `;

  return sendMail(email, html);
};

const sendResetPasswordEmail = (email, token) => {
  const href = `${process.env.BASE}/reset/${token}`;
  const html = `
  <h1>If you want to reset your password follow the link</h1>
  <a href="${href}">${href}</a>
  `;

  return sendMail(email, html);
};

module.exports = { sendMail, sendVerificationEmail, sendResetPasswordEmail };
