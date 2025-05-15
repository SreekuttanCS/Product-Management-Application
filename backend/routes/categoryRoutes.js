const express = require("express");
const {
  addCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, isAdmin, addCategory).get(getCategories);

router
  .route("/:id")
  .put(protect, isAdmin, updateCategory)
  .delete(protect, isAdmin, deleteCategory);

module.exports = router;
