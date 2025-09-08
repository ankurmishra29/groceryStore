// for logout
async function userLogout(req, res) {
  try {
    const clearCookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: 'none', 
      path: '/' 
    };
    
    res.clearCookie("token", clearCookieOptions);

    res.json({
      message: "Logout Successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (err) {
    res.json({
      message: err.message || err,
      error: true,
      success: false,
    });
  }
}

module.exports = userLogout;

