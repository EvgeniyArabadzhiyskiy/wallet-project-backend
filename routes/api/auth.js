const express = require("express");

const ctrl = require("../../controllers/users");
const { schemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");

const router = express.Router();

router.get("/djon", (req, res) => {
    res.json({ result: "GET Vercel", status: "DJON success" });
  }
);

router.post("/poly", (req, res) => {
  const body = req.body
  res.json({ result: "POST Vercel", status: "POLY success", body });
}
);

// user register route

router.post(
  "/register",
  validateBody(schemas.register),
  ctrlWrapper(ctrl.register)
);

// user login route
router.post("/login", validateBody(schemas.logIn), ctrlWrapper(ctrl.login));

// user logout route
router.post("/logout", authenticate, ctrlWrapper(ctrl.logOut));

// route user get session info by token
router.get("/current", authenticate, ctrlWrapper(ctrl.current));

module.exports = router;
