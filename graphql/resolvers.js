const { register } = require("../mongodb/db/auth");
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
    me: (parent, args, context, info) => {
      // //console.log(context.user)
      if (context().loggedIn) {
        return context().user;
      } else {
        throw new AuthenticationError("Please Login Again!");
      }
    },
    cart: (parent, { username }, context, info) => {
      return getCart(username);
    },
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
    createCart: (parent, { username }, context, info) => {
      return createCart(username);
    },
    updateCart: (parent, args, context, info) => {
      return updateCart(args);
    },
    register: (parent, args, context, info) => {
      return register(args).then((res) => {
        const token = res.token;
        return {
          token,
          ...res._doc,
        };
      });
    },
    login: (parent, args, context, info) => {
      return login(args).then((res) => {
        const token = res.token;
        return {
          token,
          ...res._doc,
        };
      });
    },
  },
};
