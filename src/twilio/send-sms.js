const config = require("../config");
const client = require("twilio")(config.accountSid, config.authToken);

/**
 * Send a SMS Message
 * @param {string} body - The sms message body
 */

async function sendMessage(body, phone) {
  try {
    const message = await client.messages.create({
      to: phone,
      from: process.env.PHONE_NUMBER,
      body,
    });
    return message;
  } catch (error) {
    console.log(error);
  }
}

module.exports = { sendMessage };
