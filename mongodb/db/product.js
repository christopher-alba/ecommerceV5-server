const { Product, Profile } = require("../models");

const createProduct = async (product) => {
  const newProduct = new Product({ ...product, views: 0 });
  const { id } = await newProduct.save();

  return {
    id: id,
    ...product,
  };
};

const updateProduct = async (product) => {
  const res = await Product.updateOne({ _id: product.id }, { ...product });
  return { ...product };
};

const deleteProduct = async (id) => {
  const res = await Product.deleteOne({ _id: id });

  // find all profiles
  const profiles = await Profile.find()

  // for each profile, update it, deleting the product id from the favourite products list.
  profiles.forEach(async profile => {
    const userId = profile.userId;
    const filteredFavourites = profile.favouriteProducts.filter((productObj) => {
      return productObj.productId !== id;
    })
    console.log(filteredFavourites);
    await Profile.updateOne({ userId: userId }, { favouriteProducts: filteredFavourites });
  })

  return id;
};

const getProduct = async (id) => {
  const item = await Product.findOne({ _id: id });
  if (item) {
    return item;
  } else {
    return "getProduct: Product not found";
  }
};

const getProducts = async () => {
  const items = await Product.find().sort([["views", "ascending"]]);
  return items;
};

const getSpecificProducts = async (ids) => {
  const specifics = await Product.find({ _id: { $in: ids } });
  return specifics;
};

const getTopPicks = async (maxCount) => {
  const items = await Product.find();
  const sortedItems = items.sort((a, b) => b.views - a.views);
  const splicedItems = sortedItems.splice(0, maxCount);
  return splicedItems;
};

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getTopPicks,
  getSpecificProducts,
};
