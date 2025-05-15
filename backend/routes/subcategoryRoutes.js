const express = require("express");
const {
  addSubcategory,
  getSubcategories,
  updateSubcategory,
  deleteSubcategory,
} = require("../controllers/subcategoryController");
const { protect, isAdmin } = require("../middleware/authMiddleware");

const router = express.Router();

router.route("/").post(protect, isAdmin, addSubcategory).get(getSubcategories);

router
  .route("/:id")
  .put(protect, isAdmin, updateSubcategory)
  .delete(protect, isAdmin, deleteSubcategory);

   
module.exports = router;
