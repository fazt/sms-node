const { Router } = require("express");
const router = Router();

const {
  indexController,
  postMessage,
  receiveMessage
} = require("../controllers/index.controller");

// Main Routes
router.get("/", indexController);

// Send an SMS
router.post("/send-sms", postMessage);

// Receive an SMS
router.post('/sms', receiveMessage);

module.exports = router;
