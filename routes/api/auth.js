const express = require("express");

const ctrl = require("../../controllers/users");
const { schemas } = require("../../models/user");
const { ctrlWrapper } = require("../../helpers");
const { validateBody, authenticate } = require("../../middlewares");

const router = express.Router();

// const allowCors = fn => async (req, res) => {
//   res.setHeader('Access-Control-Allow-Credentials', true)
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   // another common pattern
//   // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
//   res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT')
//   res.setHeader(
//     'Access-Control-Allow-Headers',
//     'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
//   )
//   if (req.method === 'OPTIONS') {
//     res.status(200).end()
//     return
//   }
//   return await fn(req, res)
// }

// const handler = (req, res) => {
//   const d = new Date()
//   res.end(d.toString())
// }

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
// module.exports = allowCors(handler)
