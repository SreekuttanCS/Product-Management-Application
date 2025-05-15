const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1hr" });
};
const registerUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const ExistUser = await User.findOne({ email });
  if (ExistUser) {
    return res.status(400).json({ msg: "User already exists" });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    res.status(200).json({ message: "User Created Successfully", user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to create user" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid Credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid Credentials" });
    const token = generateToken(user._id);
    res.status(200).json({ token, userId: user._id });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to login user" });
  }
};

const getAllUser = async (req, res) => {
  try {
    const user = await User.find().select("-password");
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to get all user" });
  }
};

const getUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to get user by id" });
  }
};

module.exports = {
  registerUser,
  generateToken,
  loginUser,
  getAllUser,
  getUserById,
};
