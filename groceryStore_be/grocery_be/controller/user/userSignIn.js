// for user login
const bcrypt = require("bcryptjs")
const userModel = require("../../models/userModel")
const jwt = require("jsonwebtoken")
const axios = require("axios")
const secret_key = "6Lf27jsqAAAAAJ0WOetDvRyo9PB1XqnC056ng6yp"

async function userSignInController(req, res) {
  try {
    const { email, password, reCaptcha } = req.body
    if (!email) {
      throw new Error("Please provide email")
    }
    if (!password) {
      throw new Error("Please provide password")
    }
    if (!reCaptcha) {
      throw new Error("Please fill captcha")
    }
    const recaptchaResponse = await axios.post(
      `https://www.google.com/recaptcha/api/siteverify?secret=${secret_key}&response=${reCaptcha}`
    )
    const { success } = recaptchaResponse.data
    if (!success) {
      throw new Error("reCAPTCHA verification failed")
    }

    const user = await userModel.findOne({ email })
    console.log("user", user)

    if (!user) {
      throw new Error("User not found!")
    }

    const checkPassword = await bcrypt.compare(password, user.password)
    console.log("checkPassword", checkPassword)
    if (checkPassword) {
      const tokenData = {
        _id: user._id,
        email: user.email,
      }
      const token = await jwt.sign(
        {
          tokenData,
        },
        process.env.TOKEN_SECRET_KEY,
        { expiresIn: 60 * 60 * 8 }
      )

      const tokenOption = {
        httpOnly: true,
        secure: true,
      }
      res.cookie("token", token, tokenOption).json({
        message: "LogIn successfully",
        data: token,
        success: true,
        error: false,
      })
    } else {
      throw new Error("Please enter correct password!")
    }
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    })
  }
}

module.exports = userSignInController
