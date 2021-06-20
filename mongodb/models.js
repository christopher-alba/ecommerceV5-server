const mongoose = require("mongoose");
const {
  productSchema,
  userSchema,
  cartSchema,
  profileSchema,
} = require("./schema");

const Product = mongoose.model("Product", productSchema);
const User = mongoose.model("User", userSchema);
const Cart = mongoose.model("Cart", cartSchema);
const Profile = mongoose.model("Profile", profileSchema);
module.exports = {
  Product,
  User,
  Cart,
  Profile,
};
