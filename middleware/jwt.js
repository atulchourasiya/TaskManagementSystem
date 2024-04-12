const Jwt = require("jsonwebtoken");
require("dotenv/config");

const signToken = (payload) => {
  return Jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const verifyToken = (token) => {
  return Jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = { signToken, verifyToken };
