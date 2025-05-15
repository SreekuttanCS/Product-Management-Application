const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const {
  toggleWishlist,
  getWishlist,
  deleteWishlist,
} = require("../controllers/wishlistController");

const router = express.Router();

router.post("/:productId", protect, toggleWishlist);
router.get("/", protect, getWishlist);
router.delete("/:productId", protect, deleteWishlist);
module.exports = router;
