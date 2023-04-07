const router = require("express").Router();
const { ControlOfId, ControlOfInput } = require("./m_middleware");
const {
  getAll,

  createNewMarket,
  update,
  remove,
} = require("./m_model");

router.get("/", async (req, res, next) => {
  try {
    const getMarkets = await getAll();

    res.json(getMarkets);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", ControlOfId, async (req, res, next) => {
  try {
    res.json(req.targetMarket);
  } catch (error) {
    next(error);
  }
});
router.post("/", ControlOfInput, async (req, res, next) => {
  try {
    const model = await createNewMarket({
      market_name: req.body.market_name,
      number_of_branches: req.body.number_of_branches,
    });
    res.status(201).json(model);
  } catch (error) {
    next(error);
  }
});
router.put("/:id", ControlOfId, ControlOfInput, async (req, res, next) => {
  try {
    const model = await update(req.params.id, {
      market_name: req.body.market_name,
      number_of_branches: req.body.number_of_branches,
    });
    res.status(201).json(model);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", ControlOfId, async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.status(204).json(req.targetMarket);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
