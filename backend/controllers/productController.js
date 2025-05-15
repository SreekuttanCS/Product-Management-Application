const Product = require("../models/Product");

exports.addProduct = async (req, res) => {
  try {
    let { name, description, category, subCategory, variants } = req.body;

    // Parse variants if sent as a JSON string (common with multipart/form-data)
    if (typeof variants === "string") {
      try {
        variants = JSON.parse(variants);
      } catch (err) {
        return res
          .status(400)
          .json({ error: "Invalid JSON format for variants" });
      }
    }

    // Validate input
    if (!name || !category || !subCategory || !Array.isArray(variants)) {
      return res.status(400).json({
        error: "Missing required fields or invalid variants format",
      });
    }

    // Create new product
    const newProduct = new Product({
      name,
      description,
      category,
      subCategory,
      image: req.file?.path || "",
      variants,
      createdBy: req.user._id,
    });

    // Save to the database
    await newProduct.save();

    res.status(201).json({
      message: "Product added successfully",
      product: newProduct,
    });
  } catch (error) {
    console.error("Add Product Error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

exports.getProducts = async (req, res) => {
  try {
    const { search = "", subCategory, page = 1, limit = 10 } = req.query;

    const query = {
      name: { $regex: search, $options: "i" },
    };

    if (subCategory) query.subCategory = subCategory;

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate("category subCategory")
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.status(200).json({ total, products });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ error: "Fetch failed" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    let { name, description, category, subCategory, variants } = req.body;

    // Parse variants if sent as string (common with form-data)
    if (typeof variants === "string") {
      try {KW
        variants = JSON.parse(variants);
      } catch (err) {
        return res.status(400).json({ error: "Invalid variants JSON format" });
      }
    }

    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    if (!product.createdBy.equals(req.user._id)) {
      return res.status(403).json({ error: "Not authorized to update" });
    }

    // Update fields
    product.name = name || product.name;
    product.description = description || product.description;
    product.category = category || product.category;
    product.subCategory = subCategory || product.subCategory;
    product.variants = variants || product.variants;
    if (req.file) product.image = req.file.path;

    await product.save();

    res.status(200).json({ message: "Product updated", product });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({ error: "Update failed" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    // Authorization check
    if (!product.createdBy.equals(req.user._id)) {
      return res.status(403).json({ error: "Not authorized to delete" });
    }

    await product.deleteOne();
    res.status(200).json({ message: "Product deleted" });
  } catch (error) {
    console.error("Delete Error:", error);
    res.status(500).json({ error: "Delete failed" });
  }
};
