// for user forgot
const bcrypt = require("bcryptjs");
const userModel = require("../../models/userModel");
const nodemailer = require("nodemailer");
require("dotenv").config();
const jwt = require("jsonwebtoken");

async function userForgotPasswordController(req, res) {
  try {
    const { email } = req.body;
    if (!email) {
      throw new Error("Please provide email");
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not registered" });
    }

    const token = await jwt.sign(
      {
        user: user._id,
      },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "5m" }
    );

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.MY_EMAIL,
      to: email,
      subject: "Reset password",
      text: `Click this link to reset your password ${process.env.FRONTEND_URL}/dashboard/resetpassword/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.json({ message: "error sending mail" });
      } else {
        return res.json({
          status: true,
          message: "Reset email sent successfully",
        });
      }
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userForgotPasswordController;
