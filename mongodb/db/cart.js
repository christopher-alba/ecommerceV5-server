const { Cart, User } = require("../models");

const createCart = async (argsuserId) => {
  // check if cart already exists for the user
  const cart = await Cart.findOne({ userId: argsuserId });
  const user = await User.findOne({ _id: argsuserId });
  if (cart) {
    throw new Error("Cart already exists for the user");
  }
  if (!user) {
    throw new Error("User does not exist in the database");
  }
  const newCart = new Cart({ userId: argsuserId });
  const { userId } = await newCart.save();
  return {
    userId,
  };
};

const updateCart = async (args) => {
  let products = args.products;
  if (args.products.length === 0) {
    products = [];
  }
  const res = await Cart.updateOne(
    { userId: args.userId },
    { products: products }
  );
  const updatedCart = await Cart.findOne({ userId: args.userId });
  console.log(updatedCart);
  return updatedCart;
};

const getCart = async (argsuserId) => {
  const cart = await Cart.findOne({ userId: argsuserId });
  return cart;
};

module.exports = {
  createCart,
  updateCart,
  getCart,
};
