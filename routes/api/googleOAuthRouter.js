// const queryString = require("query-string");
// const axios = require("axios");
// require("dotenv").config();
// const bcrypt = require("bcryptjs");
// const express = require("express");

// const router = express.Router();
// const { User } = require("../../models/user");
// const { controllerWrapper } = require("../../middlewares");
// const createToken = require("../../helpers/createToken");

// const { BASE_URL } = process.env;
// const { FRONTEND_URL } = process.env;
// const { GOOGLE_CLIENT_ID } = process.env;
// const { GOOGLE_CLIENT_SECRET } = process.env;

// const googleAuth = async (req, res) => {
//   const stringifiedParams = queryString.stringify({
//     client_id: GOOGLE_CLIENT_ID,
//     redirect_uri: `${BASE_URL}/auth-google/google-redirect`,
//     scope: [
//       "https://www.googleapis.com/auth/userinfo.email",
//       "https://www.googleapis.com/auth/userinfo.profile",
//     ].join(" "),
//     response_type: "code",
//     access_type: "offline",
//     prompt: "consent",
//   });

//   return res.redirect(
//     `https://accounts.google.com/o/oauth2/v2/auth?${stringifiedParams}`
//   );
// };

// const googleRedirect = async (req, res) => {
//   const fullUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`;

//   const urlOdject = new URL(fullUrl);
//   const urlParams = queryString.parse(urlOdject.search);
//   const code = urlParams.code;

//   const tokenData = await axios({
//     url: "https://oauth2.googleapis.com/token",
//     method: "POST",
//     data: {
//       client_id: GOOGLE_CLIENT_ID,
//       client_secret: GOOGLE_CLIENT_SECRET,
//       redirect_uri: `${BASE_URL}/auth-google/google-redirect`,
//       grant_type: "authorization_code",
//       code: code,
//     },
//   });

//   const userData = await axios({
//     url: "https://www.googleapis.com/oauth2/v2/userinfo",
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${tokenData.data.access_token}`,
//     },
//   });

//   const { id: googleId, email, name } = userData.data;
//   const user = await User.findOne({ email });

//   if (!user) {
//     const hashPassword = await bcrypt.hash(googleId, 10);

//     const googleUser = await User.create({
//       email,
//       password: hashPassword,
//       firstName: name,
//       balance: 0,
//     });

//     const token = createToken({ id: googleUser._id });
//     await User.findByIdAndUpdate(googleUser._id, { token });

//     return res.redirect(`${FRONTEND_URL}?accessToken=${token}`);
//   }

//   const token = createToken({ id: user._id });
//   await User.findByIdAndUpdate(user._id, { token });

//   return res.redirect(`${FRONTEND_URL}?accessToken=${token}`);
// };

// router.get("/google", googleAuth);
// router.get("/google-redirect", controllerWrapper(googleRedirect));

// module.exports = router;
