const { User } = require("../../models/user");

// ============================

const getBalance = async (req, res, next) => {
  try {
    const id = req.userId;
    const user = await User.findById(id);
    const userBalance = user ? user.balance : null;

    res.status(200).json({userBalance});
  } catch (error) {
    next(error);
  }
};

module.exports = getBalance;
