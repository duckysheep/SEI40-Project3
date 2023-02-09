const jwt = require("jsonwebtoken");

const checkAuth = async (req, res, next) => {
  let token = req.header("authorization");
  if (!token) {
    return res.status(403).json({ message: "Unauthorized to access page" });
  }
  token = token.split(" ")[1];
  try {
    const user = await jwt.verify(token, process.env.JWTPRIVATEKEY);
    req.user = user._id;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Unauthorized to access page" });
  }
};

module.exports = checkAuth;
