const Product = require("./models/product");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("Mongodb connection open!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Error!");
  });

// const p = new Product({
//   name: "Grape",
//   price: 49,
//   category: "Fruit",
// });
// p.save()
//   .then((res) => console.log(res))
//   .catch((err) => {
//     console.log(err);
//   });

const seedProducts = [
  {
    name: "Fairy Eggplant",
    price: 1.0,
    category: "vegetable",
  },
  {
    name: "organic mini seedless watermelon",
    price: 3.99,
    category: "fruit",
  },
  {
    name: "organic goddess melon",
    price: 4.99,
    category: "fruit",
  },
  {
    name: "organic celery",
    price: 1.59,
    category: "vegetable",
  },
  {
    name: "Chocolate Whole Milk",
    price: 2.69,
    category: "DiARY",
  },
];

Product.insertMany(seedProducts)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
