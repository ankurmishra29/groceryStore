// for user register
const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const secret_key = "6Lf27jsqAAAAAJ0WOetDvRyo9PB1XqnC056ng6yp";

async function userSignUpController(req, res) {
  try {
    const { email, password, username, reCaptcha } = req.body;

    const user = await userModel.findOne({ email });
    console.log("user", user);

    if (user) {
      throw new Error("Already user exist!");
    }
    if (!username) {
      throw new Error("Please provide username");
    }
    if (!email) {
      throw new Error("Please provide email");
    }
    if (!password) {
      throw new Error("Please provide password");
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong with bcrypt");
    }

    if (!reCaptcha) {
      throw new Error("Please fill captcha");
    }
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${reCaptcha}`
    );
    const { success } = recaptchaResponse.data;
    if (!success) {
      throw new Error("reCAPTCHA verification failed");
    }

    const payload = {
      ...req.body,
      role: "GENERAL",
      password: hashPassword,
    };

    const userData = new userModel(payload);
    const saveUser = await userData.save();

    res.status(201).json({
      data: saveUser,
      success: true,
      error: false,
      message: "User created successfully!",
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userSignUpController;
