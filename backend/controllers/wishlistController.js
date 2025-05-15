const User = require("../models/User");
const Product = require("../models/Product");

exports.toggleWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const productId = req.params.productId;

    const exists = user.wishlist.includes(productId);

    if (exists) {
      user.wishlist = user.wishlist.filter((id) => id.toString() !== productId);
      await user.save();
      return res.status(200).json({ message: "Removed from wishlist" });
    } else {
      user.wishlist.push(productId);
      await user.save();
      return res.status(200).json({ message: "Added to wishlist" });
    }
  } catch (error) {
    res.status(500).json({ error: "Wishlist toggle failed" });
  }
};

exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate({
      path: "wishlist",
      populate: ["category", "subCategory"],
    });

    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch wishlist" });
  }
};

exports.deleteWishlist = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const index = user.wishlist.indexOf(productId);
    if (index === -1)
      return res.status(404).json({ error: "Product not in wishlist" });

    user.wishlist.splice(index, 1);
    await user.save();

    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    console.error("Delete Wishlist Error:", error);
    res.status(500).json({ error: "Failed to remove product from wishlist" });
  }
};
