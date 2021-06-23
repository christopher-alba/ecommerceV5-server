const { db } = require("./connect");

const productsDB = db.collection("products");

productsDB.drop().then(() => {
  console.log("Seeds have been cleared");
  db.close();
});
