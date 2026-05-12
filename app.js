/////// app.js

const path = require("node:path");

const express = require("express");
const session = require("express-session");
const passport = require("./controllers/passport");
const indexRouter = require("./routes/indexRouter");
const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.get("/", indexRouter);
app.get("/home", indexRouter);
app.get("/messages-board", indexRouter);
app.get("/log-in", indexRouter);
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/log-in",
    failureRedirect: "/log-in",
  }),
);
app.get("/log-out", indexRouter);
app.get("/sign-up", indexRouter);
app.post("/sign-up", indexRouter);
app.get("/success", indexRouter);
app.get("/update-membership", indexRouter);
app.get("/success-membership", indexRouter);
app.get("/create-message", indexRouter);
app.post("/create-message", indexRouter);
app.get("/delete-message", indexRouter);
app.get(/^\/.+$/, (req, res) => {
  res.status(200).render("404", {
    title: "error page",
  });
});

app.listen(3000, (error) => {
  if (error) {
    throw error;
  }
  console.log("app listening on port 3000!");
});
