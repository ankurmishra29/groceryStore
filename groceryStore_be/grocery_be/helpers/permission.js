// give permission
const userModel = require("../models/userModel");

const UploadProductPermission = async (userId) => {
  const user = await userModel.findById(userId);

  if (user.role !== "ADMIN") {
    return false;
  }
  return true;
};

module.exports = UploadProductPermission;
