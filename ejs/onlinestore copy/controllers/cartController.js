exports.viewCart = (req, res) => {
  const cart = req.session.cart || [];
  res.render('cart', { cart });
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
  res.redirect('back');
};

exports.removeFromCart = (req, res) => {
  const { productId } = req.body;

  req.session.cart = req.session.cart.filter(item => item.productId != productId);

  res.redirect('/cart');
};