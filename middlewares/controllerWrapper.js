const controllerWrapper = (ctrl) => {
  return (req, res, next) => {
    ctrl(req, res).catch((err) => {
      // console.log("return ~ err", err.message);
      next(err);
    });
  };
};

module.exports = controllerWrapper;
