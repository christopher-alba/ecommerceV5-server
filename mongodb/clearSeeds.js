const { db } = require("./connect");

const productsDB = db.collection("products");

productsDB.deleteMany({}, () => {
  console.log("Seeds have been cleared");
  db.close();
});
