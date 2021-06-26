const { db } = require("./connect");

const productsDB = db.collection("products");

productsDB.deleteMany({}, () => {
  console.log("Seeds have been cleared");
});

let products = [];
let counter = 0;

function makeOrientation() {
  const orientations = ["MASCULINE", "FEMININE", "UNISEX"];
  const randomIndex = Math.floor(Math.random() * 3);
  return orientations[randomIndex];
}
function makeType() {
  const type = ["TSHIRTS", "SHORTS", "PANTS", "JACKETS"];
  const randomIndex = Math.floor(Math.random() * 4);
  return type[randomIndex];
}
function makeSize() {
  const size = ["XS", "S", "M", "L"];
  const randomIndex = Math.floor(Math.random() * 4);
  return size[randomIndex];
}

for (let i = 0; i < 100; i++) {
  counter++;
  products.push({
    name: "Product" + counter,
    price: (Math.random() * 100).toFixed(2),
    description:
      "Description Number " +
      counter +
      " Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    images: [
      {
        url: `https://picsum.photos/1920/1080?random=${counter}`,
      },
      {
        url: `https://picsum.photos/1920/1080?random=${counter + 1}`,
      },
      {
        url: `https://picsum.photos/1920/1080?random=${counter + 2}`,
      },
    ],
    sizes: [
      {
        stock: Math.floor(Math.random() * 100),
        size: makeSize(),
      },
    ],
    orientation: makeOrientation(),
    views: Math.floor(Math.random() * 1000),
    clothingType: makeType(),
  });
}

productsDB.insertMany(products).then(() => {
  db.close();
  console.log("Products have been inserted");
});
