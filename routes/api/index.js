const authRouter = require("./auth");
const transactionsRouter = require("./transactions");
const googleRouter = require("./googleOAuthRouter");

module.exports = { authRouter, transactionsRouter, googleRouter };
