const { getAll, getById } = require("./m_model");

async function ControlOfId(req, res, next) {
  try {
    const getId = await getById(req.params.id);
    if (getId) {
      req.targetMarket = getId;
      next();
    } else {
      res.status(404).json({ message: "Market's not found" });
    }
  } catch (error) {
    next(error);
  }
}
async function ControlOfInput(req, res, next) {
  try {
    const insertInfo = req.body;
    if (insertInfo.market_name && insertInfo.number_of_branches) {
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
