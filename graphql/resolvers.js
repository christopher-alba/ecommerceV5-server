const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
} = require("../mongodb/db/product");

exports.resolvers = {
  Query: {
    product: (parent, args, context, info) => getProduct(args.id),
    products: () => getProducts(),
  },
  Mutation: {
    createProduct: (parent, args, context, info) => {
      return createProduct(args.product);
    },
    updateProduct: (parent, args, context, info) => {
      return updateProduct(args.product);
    },
    deleteProduct: (parent, args, context, info) => {
      return deleteProduct(args.id);
    },
  },
};
