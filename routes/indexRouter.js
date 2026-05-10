const { Router } = require("express");
const indexControllers = require("../controllers/indexControllers");
const formControllers = require("../controllers/formControllers");
const indexRouter = Router();

indexRouter.get("/", indexControllers.index_GET);
indexRouter.get("/sign-up", indexControllers.signUp_GET);
indexRouter.post("/sign-up", formControllers.validateForm);
indexRouter.post("/sign-up", indexControllers.signUp_POST);
indexRouter.get("/success", indexControllers.success_GET);

module.exports = indexRouter;
