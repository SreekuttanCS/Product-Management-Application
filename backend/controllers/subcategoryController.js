const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category");

// Create Subcategory (Admin only)
const addSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    const category = await Category.findById(categoryId);
    if (!category)
      return res.status(404).json({ message: "Category not found" });

    // Check duplicate subcategory name under same category
    const existing = await Subcategory.findOne({ name, category: categoryId });
    if (existing)
      return res
        .status(400)
        .json({ message: "Subcategory already exists in this category" });

    const subcategory = await Subcategory.create({
      name,
      category: categoryId,
    });
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get Subcategories 
const getSubcategories = async (req, res) => {
  try {
    const { categoryId } = req.query;

    let filter = {};
    if (categoryId) filter.category = categoryId;

    const subcategories = await Subcategory.find(filter).populate(
      "category",
      "name"
    );
    res.json(subcategories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update Subcategory (Admin only)
const updateSubcategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, categoryId } = req.body;

    const subcategory = await Subcategory.findById(id);
    if (!subcategory)
      return res.status(404).json({ message: "Subcategory not found" });

    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category)
        return res.status(404).json({ message: "Category not found" });
      subcategory.category = categoryId;
    }

    subcategory.name = name || subcategory.name;
    await subcategory.save();

    res.json(subcategory);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete Subcategory (Admin only)
const deleteSubcategory = async (req, res) => {
  try {
    const { id } = req.params;

    const subcategory = await Subcategory.findById(id);
    if (!subcategory)
      return res.status(404).json({ message: "Subcategory not found" });

    await subcategory.remove();
    res.json({ message: "Subcategory removed" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addSubcategory,
  getSubcategories,
  updateSubcategory,
  deleteSubcategory,
};
