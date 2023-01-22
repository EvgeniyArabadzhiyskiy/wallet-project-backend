const { Transaction } = require("../../models/transaction");
const { ObjectId } = require("mongoose").Types;

const getCategories = async (req, res, next) => {
	try {
		const _id = req.userId;

		const categories = await Transaction.aggregate()
			.match({
				owner: ObjectId(_id),
			})
			.group({
				_id: "$category",
			});
		const allCategories = [];
		categories.forEach((el) => {
			allCategories.push(el._id);
		});
		res.json(allCategories);
	} catch (error) {
		next(error);
	}
};

module.exports = getCategories;
