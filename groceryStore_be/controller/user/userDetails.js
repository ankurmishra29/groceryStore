// for user details
const userModel = require("../../models/userModel");

async function userDetailsController(req, res) {
  try {
    console.log("userId ", req.userId);

    const user = await userModel.findById(req.userId);

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "user details",
    });

    console.log("user", user);

    if (!req.userId) {
      return res.status(401).json({
        message: "User not authenticated",
        error: true,
        success: false,
      });
    }
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userDetailsController;
