// for count add to cart
const addToCartModel = require("../../models/cartProduct");

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userId;
    console.log("userid:", req.userId);
    const count = await addToCartModel.countDocuments({
      userId: userId,
    });
    console.log("count", count);
    res.json({
      data: {
        count: count,
      },
      message: "ok",
      error: false,
      success: true,
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = countAddToCartProduct;
