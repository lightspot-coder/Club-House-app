const db = require("../db/queries");
const { matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");

async function index_GET(req, res) {
  const messages = await db.getMessages();
  console.log(messages);
  res.render("index", {
    title: "Clubhouse home",
    messages: messages,
  });
}
function signUp_GET(req, res) {
  res.render("sing-up", {
    title: "Sign up",
  });
}
function success_GET(req, res) {
  res.render("success", {
    title: "success",
  });
}
async function signUp_POST(req, res) {
  const { firstName, lastName, userName, password } = matchedData(req);
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.addUser({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    password: hashedPassword,
  });
  res.render("success", {
    title: "add user success",
    userName: userName,
  });
}
module.exports = {
  index_GET,
  signUp_GET,
  success_GET,
  signUp_POST,
};
