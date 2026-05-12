const { Router } = require("express");
const indexControllers = require("../controllers/indexControllers");
const formControllers = require("../controllers/formControllers");
const createMessageControllers = require("../controllers/createMessageControllers");
const indexRouter = Router();

indexRouter.get("/", indexControllers.login_GET);
indexRouter.get("/log-in", indexControllers.login_GET);
indexRouter.get("/messages-board", indexControllers.messageBoard_GET);
indexRouter.get("/sign-up", indexControllers.signUp_GET);
indexRouter.post("/sign-up", formControllers.validateForm);
indexRouter.post("/sign-up", indexControllers.signUp_POST);
indexRouter.get("/success", indexControllers.success_GET);
indexRouter.get("/update-membership", indexControllers.updateMembership_GET);
indexRouter.get("/log-out", indexControllers.logOut_GET);
indexRouter.get("/success-membership", indexControllers.successMembership_GET);
indexRouter.get("/create-message", createMessageControllers.createMessage_GET);
indexRouter.post(
  "/create-message",
  createMessageControllers.createMessage_POST,
);

module.exports = indexRouter;
