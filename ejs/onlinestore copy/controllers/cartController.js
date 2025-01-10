const Product = require('../models/Product');

exports.addToCart = (req, res) => {
  const { productId } = req.body;
  const cart = req.session.cart || [];
  const existingItem = cart.find(item => item.productId == productId);

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.push({ productId, quantity: 1 });
  }

  req.session.cart = cart;
  res.json({ count: cart.reduce((sum, item) => sum + item.quantity, 0) });
};

exports.removeFromCart = (req, res) => {
  const { productId } = req.body;
  const cart = req.session.cart || [];
  req.session.cart = cart.filter(item => item.productId != productId);

  res.json({ count: req.session.cart.reduce((sum, item) => sum + item.quantity, 0) });
};


exports.viewCart = async (req, res) => {
    try {
        const cart = req.session.cart || [];

        // Veritabanından ürün bilgilerini getir ve birleştir
        const detailedCart = await Promise.all(
            cart.map(async (item) => {
                const product = await Product.getById(item.productId);

                if (product) {
                    return {
                        productId: item.productId,
                        name: product.name,
                        price: product.price, // Sayı türünde olmalı
                        quantity: item.quantity,
                        total: (product.price * item.quantity).toFixed(2), // Toplam fiyat
                    };
                } else {
                    return null; // Ürün bulunamazsa null
                }
            })
        );

        // Null olanları filtrele (ürün bulunamayan durumlar)
        const filteredCart = detailedCart.filter(item => item !== null);

        res.render('pages/cart', { cart: filteredCart });
    } catch (error) {
        console.error('Error fetching cart details:', error);
        res.status(500).send('Server error');
    }
};

exports.updateQuantity = async (req, res) => {
  try {
      const { productId, quantity } = req.body;
      const cart = req.session.cart || [];

      // Sepetteki ürünü bulun
      const item = cart.find(item => item.productId === productId);
      if (!item) {
          return res.status(404).json({ error: 'Product not found in cart' });
      }

      // Miktarı güncelle
      item.quantity = parseInt(quantity, 10);

      // Sepeti güncelle
      req.session.cart = cart;
      res.json({
          message: 'Cart updated successfully',
          cart,
          cartCount: cart.length
      });
  } catch (error) {
      console.error('Error updating cart quantity:', error);
      res.status(500).json({ error: 'Server error' });
  }
};
exports.removeFromCart = async (req, res) => {
  try {
      const productId = req.body.productId; // Silinecek ürünün ID'sini al
      const cart = req.session.cart || []; // Mevcut sepet

      // Sepetten ürünü kaldır
      const updatedCart = cart.filter(item => item.productId !== productId);
      req.session.cart = updatedCart; // Güncellenmiş sepeti kaydet

      res.json({
          message: 'Product removed from cart.',
          cart: updatedCart,
          cartCount: updatedCart.length
      });
  } catch (error) {
      console.error('Error removing product from cart:', error);
      res.status(500).json({ error: 'Server error' });
  }
};
