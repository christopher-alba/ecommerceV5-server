const { ApolloServer, gql } = require("apollo-server");
const { resolve } = require("path");
const { readFileSync } = require("fs");
const { resolvers } = require("./graphql/resolvers");
const { getPayload } = require("./util");
require("./mongodb/connect");

const typeDefs = gql(
  readFileSync(resolve("./graphql/schema.graphql"), {
    encoding: "utf8",
  })
);
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || "";
    // try to retrieve a user with the token
    const { payload: user, loggedIn } = getPayload(token);
    // add the user to the context
    const returnPayload = {
      ...user,
      token,
    };
    return { user: returnPayload, loggedIn };
  },
});

// The `listen` method launches a web server.
server.listen( process.env.PORT || 5000 ).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
