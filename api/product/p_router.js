const router = require("express").Router();
const { ControlOfId, ControlOfInput } = require("./p_middleware");
const {
  getAll,
  getById,
  createNewProduct,
  update,
  remove,
} = require("./p_model");
router.get("/", async (req, res, next) => {
  try {
    const getProducts = await getAll();

    res.json(getProducts);
  } catch (error) {
    next(error);
  }
});
router.get("/:id", ControlOfId, async (req, res, next) => {
  try {
    res.json(req.targetProduct);
  } catch (error) {
    next(error);
  }
});
router.post("/", ControlOfInput, async (req, res, next) => {
  try {
    const model = await createNewProduct({
      product_name: req.body.product_name,
      price: req.body.price,
      market_Id: req.body.market_Id,
    });
    res.status(201).json(model);
  } catch (error) {
    next(error);
  }
});
router.put("/:id", ControlOfId, ControlOfInput, async (req, res, next) => {
  try {
    const model = await update(req.params.id, {
      product_name: req.body.product_name,
      price: req.body.price,
      market_Id: req.body.market_Id,
    });
    res.status(201).json(model);
  } catch (error) {
    next(error);
  }
});
router.delete("/:id", ControlOfId, async (req, res, next) => {
  try {
    await remove(req.params.id);
    res.status(204).json(req.targetProduct);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
