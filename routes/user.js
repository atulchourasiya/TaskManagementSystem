const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const { signToken } = require("../middleware/jwt");

router.post("/registerUser", async (req, res) => {
  try {
    const { email, name, password } = req.body;
    if (!email || !name || !password)
      return res.status(400).json({ message: "Bad Request" });
    const userExists = await User.findOne({
      email,
    });
    if (userExists)
      return res.status(400).json({ message: "User Already Exists!" });
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = new User({
      email,
      name,
      password: hashedPassword,
    });
    const savedUser = await user.save();
    res.status(200).json(savedUser);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/loginUser", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Bad Request" });
    const user = await User.findOne({email : email});
    if(!user){
      return res.status(400).json({ message: "User Not Fount!" });
    }
    const match = await bcrypt.compare(password , user.password);
    if(match){
      const token = signToken({email});
      res.cookie('jwt_auth', token, {
				maxAge: 24 * 60 * 60 * 1000,
				sameSite: 'strict',
				secure: true,
				httpOnly: true
			}).json(user);
    }else{
      return res.status(400).json({ message: "Username Or Password Doesn't Match!" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
