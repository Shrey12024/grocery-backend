const Product = require('../models/Product');

// GET all products
exports.getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// POST create product
exports.createProduct = async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.status(201).json(newProduct);
};
