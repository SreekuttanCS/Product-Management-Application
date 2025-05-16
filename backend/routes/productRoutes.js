const express = require("express");
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
  getProductById,
} = require("../controllers/productController");
const { protect } = require("../middleware/authMiddleware");
const multer = require("multer");
const { storage } = require("../utils/cloudinary");
const upload = multer({ storage });

const router = express.Router();

router.post("/", protect, upload.single("image"), addProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);

router.put("/:id", protect, upload.single("image"), updateProduct);
router.delete("/:id", protect, deleteProduct);

module.exports = router;
