const { User } = require("../../models/user");
const { Transaction, addSchema } = require("../../models/transaction");
const { RequestError } = require("../../utils");

const editTransaction = async (req, res, next) => {
  try {
    const { userId } = req;
    const { transactionId } = req.params;
    const { error } = addSchema.validate(req.body);
    if (error) throw new Error(error);

    const prevResult = await Transaction.findOne({ _id: transactionId, owner: userId });
    
    const { typeOperation: prevTypeOperation, amount: prevAmount, date: prevDate } = prevResult;
    const prevSum = prevTypeOperation === "income" ? prevAmount : -prevAmount;

    const result = await Transaction.findOneAndUpdate(
      { _id: transactionId, owner: userId }, { ...req.body, date: prevDate, }, { new: true }
    );

    const { typeOperation, amount } = result;
    const sum = typeOperation === "income" ? amount : -amount;

    const user = await User.findById({ _id: userId });
    if (!user) throw RequestError(404);

    const newSum = prevSum - sum;

    const newBalance = user.balance - newSum;
    await User.findByIdAndUpdate({ _id: userId }, { balance: newBalance });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = editTransaction;
