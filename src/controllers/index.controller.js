const SMS = require("../models/sms");
const { sendMessage } = require("../twilio/send-sms");

const MessagingReponse = require("twilio").twiml.MessagingResponse;

const { getSocket } = require("../sockets");

const indexController = async (req, res) => {
  // Find all saved messages
  const messages = await SMS.find().sort("-createdAt").lean();
  res.render("index", {
    messages: messages,
  });
};

const postMessage = async (req, res) => {
  const { message, phone } = req.body;

  if (!message || !phone) return res.json('Missing message or phone');

  // Send an SMS with the message
  const result = await sendMessage(message, phone);

  // log the SMS id
  console.log(result.sid);

  // Saving the SMS in database
  await SMS.create({ Body: req.body.message, From: req.body.phone });

  res.redirect('/');
};

const receiveMessage = async (req, res) => {
  const twiml = new MessagingReponse();

  // Receiving the SMS
  console.log(req.body.Body);
  // console.log(req.body.From)

  // Saving the SMS in database
  const savedSMS = await SMS.create({
    Body: req.body.Body,
    From: req.body.From,
  });

  getSocket().emit("new message", savedSMS);

  res.writeHead(200, { "Content-Type": "text/xml" });
  // twiml.message('This is my response');
  // console.log(twiml.toString())

  // Reponse Back SMS
  // res.end('<Response></Response>')
  res.end(twiml.toString());
};

module.exports = {
  indexController,
  postMessage,
  receiveMessage,
};
