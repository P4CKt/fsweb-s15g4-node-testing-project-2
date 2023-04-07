const { getAll, getById } = require("./p_model");

async function ControlOfId(req, res, next) {
  try {
    const getId = await getById(req.params.id);
    if (getId) {
      req.targetProduct = getId;
      next();
    } else {
      res.status(404).json({ message: "Product's not found" });
    }
  } catch (error) {
    next(error);
  }
}
async function ControlOfInput(req, res, next) {
  try {
    const insertInfo = req.body;
    if (insertInfo.product_name && insertInfo.price && insertInfo.market_Id) {
      next();
    } else {
      res.status(400).json({ message: "Required field is left blank" });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  ControlOfId,
  ControlOfInput,
};
