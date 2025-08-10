//for get all product
const productModel = require("../../models/productModel");

const getAllProduct = async (req, res) => {
  try {
    const allProduct = await productModel.find();

    res.json({
      message: "All product",
      data: allProduct,
      success: true,
      error: false,
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
};

module.exports = getAllProduct;
