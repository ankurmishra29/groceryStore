// backend router
const express = require("express");
const router = express.Router();
const userSignUpController = require("../controller/user/userSignUp");
const userSignInController = require("../controller/user/userSignIn");
const authToken = require("../middleware/authToken");
const userDetailsController = require("../controller/user/userDetails");
const userLogout = require("../controller/user/userLogout");
const userForgotPasswordController = require("../controller/user/userForgot");
const userResetPasswordController = require("../controller/user/userReset");
const UploadProductController = require("../controller/product/uploadProduct");
const getCategoryProduct = require("../controller/product/getCategoryProduct");
const getAllProduct = require("../controller/product/getAllProduct");
const getProductDetail = require("../controller/product/getProductDetail");
const addToCartController = require("../controller/user/addToCart");
const countAddToCartProduct = require("../controller/user/countAddToCartProduct");
const addToCartViewProduct = require("../controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../controller/user/updateAddToCartProduct");
const deleteAddToCart = require("../controller/user/deleteAddToCart");
const searchProduct = require("../controller/product/searchProduct");

// about User
router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/userDetails", authToken, userDetailsController);
router.get("/userLogout", userLogout);
router.post("/forgotpassword", userForgotPasswordController);
router.post("/resetpassword/:token", userResetPasswordController);

// about product
router.post("/uploadProduct", authToken, UploadProductController);
router.get("/getCategoryProduct", getCategoryProduct);
router.get("/getAllProduct", getAllProduct);
router.post("/productDetail", getProductDetail);
router.get("/searchProduct", searchProduct);

//add to cart
router.post("/addToCart", authToken, addToCartController);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/viewCartProduct", authToken, addToCartViewProduct);
router.post("/updateCartProduct", authToken, updateAddToCartProduct);
router.post("/deleteCartProduct", authToken, deleteAddToCart);

module.exports = router;
