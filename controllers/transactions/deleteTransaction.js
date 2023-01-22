const { User } = require("../../models/user");
const { Transaction } = require("../../models/transaction");
const { RequestError } = require("../../utils");

const deleteTransaction = async (req, res, next) => {
  try {
    const { userId } = req;
    const { transactionId } = req.params;
    
    const result = await Transaction.findOneAndDelete({ _id: transactionId, owner: userId });
    if (!result) throw RequestError(404);

    const {typeOperation, amount} = result
    const sum = typeOperation === "income" ? amount : -amount;

    const user = await User.findById({_id: userId});
    if (!user) throw RequestError(404);

    const newBalance = user.balance - sum
    await User.findByIdAndUpdate({_id: userId}, {balance: newBalance});
   
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = deleteTransaction;
