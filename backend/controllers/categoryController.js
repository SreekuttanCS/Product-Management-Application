const Category = require("../models/Category");

// Create Category (Admin only)
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const existing = await Category.findOne({ name });
    if (existing)
      return res.status(400).json({ message: "Category already exists" });

    const category = await Category.create({ name });
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get All Categories
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Category (Admin only)
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    const category = await Category.findById(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    category.name = name || category.name;
    await category.save();

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Category (Admin only)
const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const category = await Category.findById(id);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    await category.remove();
    res.json({ message: "Category removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addCategory, getCategories, updateCategory, deleteCategory };
