const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product");
const methodoverride = require("method-override");

mongoose
  .connect("mongodb://127.0.0.1:27017/farmStand")
  .then(() => {
    console.log("Mongodb connection open!");
  })
  .catch((err) => {
    console.log(err);
    console.log("Error!");
  });

// idk the actual purpose of this lines
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
// for post req
app.use(express.urlencoded({ extended: true }));
// for put or del req ----------> We can't mention method as PUT or DELETE in html or ejs
// rather we mention as a query string , "/products/<%= product._id %>?_method=PUT"------------ _method = PUT or _method = POST
app.use(methodoverride("_method"));

// displaying all the data in single page
app.get("/products", async (req, res) => {
  //   console.log(Product.find({})); // not data
  const product = await Product.find({});
  // console.log(product); // data
  res.render("products/index", { product });
});

// displaying single item
app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  res.render("products/detail", { product });
  console.log(product);
});

// create
app.get("/products/new", (req, res) => {
  res.render("products/new");
});

app.post("/products", async (req, res) => {
  const p = new Product(req.body);
  await p.save();
  const product = await Product.find({});
  res.redirect(`products/${p._id}`);
});

// put - Update
app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  res.render("products/edit", { product });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  res.redirect(`/products/${product._id}`);
});

// delete
app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen(5000, () => {
  console.log("APP IS LISTENING ON PORT 5000");
});
