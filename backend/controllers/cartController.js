const Cart = require("../models/Cart");

exports.getCart = async (req, res) => {
  const userId = req.user.id;
  const cart = await Cart.findOne({ userId }).populate("items.productId");
  res.json(cart || { items: [] });
};

exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  let cart = await Cart.findOne({ userId });
  if (!cart) cart = new Cart({ userId, items: [] });

  const item = cart.items.find((i) => i.productId.toString() === productId);
  if (item) item.quantity += quantity;
  else cart.items.push({ productId, quantity });

  await cart.save();
  res.json(cart);
};

exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;
  const cart = await Cart.findOne({ userId });
  if (!cart) return res.status(404).json({ error: "Cart not found" });

  cart.items = cart.items.filter((item) => item.productId.toString() !== productId);
  await cart.save();
  res.json(cart);
};
