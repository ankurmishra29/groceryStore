const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
  try {
    const token = req?.cookies?.token;
    console.log('cookies', req?.cookies);
    console.log("token", token);
    
    if (!token) {
      return res.status(401).json({
        message: "Please Login...",
        error: true,
        success: false,
      });
    }

    jwt.verify(token, process.env.TOKEN_SECRET_KEY, function (err, decoded) {
      if (err) {
        console.log("auth error", err);
        return res.status(401).json({
          message: "Invalid token",
          error: true,
          success: false,
        });
      }

      req.userId = decoded?.tokenData?._id;
      console.log("userId", req.userId);
      next();
    });
  } catch (err) {
    res.status(400).json({
      message: err.message || err,
      data: [],
      error: true,
      success: false,
    });
  }
}

module.exports = authToken;
