const { register, login } = require("../mongodb/db/auth");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProduct,
  getProducts,
  getTopPicks,
} = require("../mongodb/db/product");
const {
  getProfile,
  updateProfile,
  createProfile,
} = require("../mongodb/db/profile");
const { createCart, updateCart, getCart } = require("../mongodb/db/cart");
const { AuthenticationError } = require("apollo-server");

exports.resolvers = {
  Query: {
    product: (parent, args, context, info) => getProduct(args.id),
    products: () => getProducts(),
    me: (parent, args, context, info) => {
      if (context.loggedIn) {
        return context.user;
      } else {
        throw new AuthenticationError("Please Login Again!");
      }
    },
    cart: (parent, { userId }, context, info) => {
      return getCart(userId);
    },
    profile: (parent, args, context, info) => {
      return getProfile(args.userId);
    },
    topPicks: (parent, args, context, info) => {
      return getTopPicks(args.maxCount);
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
      console.log(args);
      return updateCart(args);
    },
    createProfile: (parent, args, context, info) => {
      return createProfile({ userId: args.id });
    },
    updateProfile: (parent, args, context, info) => {
      return updateProfile(args.profile);
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
