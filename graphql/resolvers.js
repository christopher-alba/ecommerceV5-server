const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
} = require("../mongodb/db/product");

exports.resolvers = {
  Query: {
    product: ({ id }) => getProduct(id),
    products: () => getProducts(),
  },
  Mutation: {
    createProduct: ({ product }) => {
      return createProduct(product);
    },
    updateProduct: ({ product }) => {
      return updateProduct(product);
    },
    deleteProduct: ({ id }) => {
      return deleteProduct(id);
    },
  },
};
