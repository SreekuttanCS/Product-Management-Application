import axios from "axios";

const WishListFetch = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("http://localhost:5000/api/wishlist", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return res.data.wishlist;
  } catch (err) {
    return err.response?.data;
  }
};

export default WishListFetch;
