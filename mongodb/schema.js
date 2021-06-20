const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  price: Number,
  description: String,
  images: [{ type: String }],
  sizes: [{ type: String, stock: Number }],
  orientation: String,
  views: Number,
  clothingType: String,
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  token: String,
  permission: String,
});

const cartSchema = new mongoose.Schema({
  userId: String,
  products: [
    {
      name: String,
      price: Number,
      description: String,
      images: [{ type: String }],
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
};