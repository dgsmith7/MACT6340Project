import nodemailer from "nodemailer";

export async function sendMessage(sub, txt) {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure: process.env.MAIL_SECURE,
    auth: {
      user: process.env.MAIL_USERNAME,
      pass: process.env.MAIL_PASSWORD,
    },
    requireTLS: process.env.MAIL_TLS,
  });

  let message = {
    from: process.env.MESSAGE_FROM,
    to: process.env.MESSAGE_TO,
    subject: sub,
    text: txt,
  };

  await transporter
    .sendMail(message)
    .then(() => {
      console.log("Message sent");
    })
    .catch((err) => {
      console.log("Message not sent - " + err);
    });
}
