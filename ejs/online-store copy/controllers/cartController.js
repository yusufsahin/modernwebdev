exports.viewCart = (req, res) => {
  const cart = req.session.cart || [];
  res.render('cart', { cart }); // Render the cart view
};

exports.addToCart = (req, res) => {
  const { productId, productName, price } = req.body;

  const cart = req.session.cart || [];
  const existingItem = cart.find(item => item.productId == productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ productId, productName, price, quantity: 1 });
  }

  req.session.cart = cart;
  res.json({
    message: 'Product added to cart',
    count: cart.reduce((sum, item) => sum + item.quantity, 0), // Total product count
  });
}
exports.removeFromCart = (req, res) => {
  const { productId } = req.body;

  const cart = req.session.cart || [];
  req.session.cart = cart.filter(item => item.productId != productId);

  res.json({
      message: 'Product removed from cart',
      count: req.session.cart.reduce((sum, item) => sum + item.quantity, 0), // Güncellenmiş toplam ürün sayısı
  });
};
