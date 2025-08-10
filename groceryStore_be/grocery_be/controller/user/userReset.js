// for user reset password
const jwt = require("jsonwebtoken");
const userModel = require("../../models/userModel");
const bcrypt = require("bcryptjs");

async function userResetPasswordController(req, res) {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).send({ message: "password not found" });
    }

    const decode = jwt.verify(token, process.env.TOKEN_SECRET_KEY);

    const user = await userModel.findOne({ Email: decode.email });

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        message: "New password cannot be the same as the old password",
        error: true,
        success: false,
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);

    if (!hashPassword) {
      throw new Error("Something is wrong with bcrypt");
    }

    user.password = hashPassword;
    await user.save();

    res.status(200).json({
      message: "Password successfully reset",
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
}

module.exports = userResetPasswordController;
