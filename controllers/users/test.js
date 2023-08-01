const test = async (req, res, next) => {
  res.status(200).json({ message: "Test Success" });
};

module.exports = test;
