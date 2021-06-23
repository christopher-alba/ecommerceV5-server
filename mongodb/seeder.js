const { db } = require("./connect");

const productsDB = db.collection("products");

productsDB.drop();

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
  products.push({
    id: counter++,
    name: "Product" + counter,
    price: (Math.random() * 100).toFixed(2),
    description: "Description Number" + counter,
    images: [
      {
        url: `https://picsum.photos/1920/1080?random=${counter}`,
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
