const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { createError } = require("../../helpers");

const { SECRET_KEY } = process.env;

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    throw createError(401, "invalid password or email");
  }

  const passwordValid = await bcrypt.compare(password, user.password);

  if (!passwordValid) {
    throw createError(401, "invalid password or email");
  }


  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "14d" });

  await User.findByIdAndUpdate(user._id, { token });

  // res.setHeader("Set-Cookie", "userName=DJON; Max-Age=900000; Path=/");
  res.setHeader("Set-Cookie", `accessToken=${token}; Max-Age=${30 * 24 * 60 * 60}; Path=/`);

  res.json({
    user: {
      email: user.email,
      firstName: user.firstName,
      balance: user.balance
    },
    token,
  })
};

module.exports = login;
