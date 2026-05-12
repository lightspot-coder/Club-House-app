const db = require("../db/queries");
const { matchedData } = require("express-validator");
const bcrypt = require("bcryptjs");
const secretPassword = "cat";

function login_GET(req, res) {
  res.render("log-in", {
    title: "login",
    user: req.user,
  });
}

async function messageBoard_GET(req, res) {
  const messages = await db.getMessages();

  // change the usernames and timestamp to hidden if the user is not a member or is a visitor
  if (!req.user || req.user.membership_status == "disable") {
    messages.map((message) => {
      message.username = "hidden";
      message.timestamp = "hidden";
    });
  }
  res.render("messages-board", {
    title: "Clubhouse home",
    messages: messages,
    user: req.user,
  });
}
function signUp_GET(req, res) {
  res.render("sign-up", {
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
  let admin = req.body.admin;
  if (admin == undefined) {
    admin = "false";
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  await db.addUser({
    firstName: firstName,
    lastName: lastName,
    userName: userName,
    password: hashedPassword,
    admin: admin,
  });
  res.render("success-sign-up", {
    title: "add user success",
    userName: userName,
  });
}
async function updateMembership_GET(req, res) {
  const secondTry = req.query.secondtry;
  const secret = req.query.secret;
  const userId = req.user.id;
  let wrongSecretPassword = true;
  if (secret === secretPassword) {
    await db.updateMembership(userId);
    wrongSecretPassword = false;
    res.render("success-membership", {
      title: "success",
      user: req.user,
    });
    return;
  }
  if (secondTry === undefined) {
    res.render("update-membership", {
      title: "update membership",
      user: req.user,
    });
    return;
  }
  res.render("update-membership", {
    title: "update membership",
    user: req.user,
    wrongSecretPassword: wrongSecretPassword,
  });
}

function logOut_GET(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
}

function successMembership_GET(req, res) {
  res.render("success-membership", {
    title: "success membership",
    user: req.user,
  });
}

async function deleteMessage_GET(req, res) {
  console.log(req.query.id);
  await db.deleteMessage(req.query.id);
  res.redirect("/");
}

module.exports = {
  messageBoard_GET,
  signUp_GET,
  success_GET,
  signUp_POST,
  updateMembership_GET,
  login_GET,
  logOut_GET,
  successMembership_GET,
  deleteMessage_GET,
};
