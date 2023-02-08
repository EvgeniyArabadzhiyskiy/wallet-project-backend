const controllerWrapper = (ctrl) => {
  return (req, res, next) => {
    ctrl(req, res).catch((err) => {
      next(err);
    });
  };
};

module.exports = controllerWrapper;
