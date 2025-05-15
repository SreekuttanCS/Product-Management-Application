const express = require("express");
const {
  registerUser,
  loginUser,
  getAllUser,
  getUserById,
} = require("../controllers/userController");

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/all", getAllUser);
router.get("/:id", getUserById);
module.exports = router;
