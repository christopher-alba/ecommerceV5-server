const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  images: [{ url: String }],
  sizes: [{ stock: Number, size: String }],
  orientation: String,
  views: Number,
  clothingType: String,
  favourites: Number
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
  permission: String,
});

const profileSchema = new mongoose.Schema({
  userId: String,
  firstName: String,
  lastName: String,
  favouriteProducts: [{ productId: String }],
  profilePicture: {
    url: String,
  },
});

const cartSchema = new mongoose.Schema({
  userId: String,
  products: [
    {
      name: String,
      price: Number,
      productId: String,
      description: String,
      images: [{ url: String }],
      orientation: String,
      clothingType: String,
      size: String,
    },
  ],
});

module.exports = {
  productSchema,
  userSchema,
  cartSchema,
  profileSchema,
};
