// mailFunctions.js
const sgMail = require("@sendgrid/mail");
const dotenv = require("dotenv");
const res = require("express/lib/response");
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendMail = (receiver, sender, subject, msg) => {
  const msgToSend = {
    to: receiver,
    from: sender,
    subject: subject,
    text: msg,
    //html: "...",
  };

  sgMail
    .send(msgToSend)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })
}

module.exports = {
    sendMail
}