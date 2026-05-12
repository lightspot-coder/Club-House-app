const db = require("../db/queries");

function createMessage_GET(req, res) {
  res.render("create-message", {
    title: "create new message",
    user: req.user,
  });
}

async function createMessage_POST(req, res) {
  const message = {
    title: req.body.title,
    text: req.body.text,
  };
  const messageId = await db.addMessage(req.user.id, message);
  const storeMessage = await db.getMessageById(messageId.id);
  res.render("success-message", {
    title: "success new message",
    user: req.user,
    message: storeMessage,
  });
}

module.exports = {
  createMessage_GET,
  createMessage_POST,
};
