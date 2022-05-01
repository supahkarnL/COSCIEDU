const { verify } = require("jsonwebtoken");

const ValidateToken = (req, res, next) => {
  const accessToken = req.header("accessToken");

  if (!accessToken) {
    return res.json({ error: "User not logged in!" });
  } else {
    try {
      const validToken = verify(accessToken, "importantsecret");
      req.user = validToken;
      if (validToken) {
        return next();
      }
    } catch (err) {
      return res.json({ error: "not match" });
    }
  }
};

module.exports = { ValidateToken };
