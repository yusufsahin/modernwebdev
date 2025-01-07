const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(
  session({
    secret: 'store-secret',
    resave: false,
    saveUninitialized: true,
  })
);

const indexRoutes = require('./routes/indexRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');
app.use((req, res, next) => {
  res.locals.cart = req.session.cart || []; // Make cart accessible to all templates
  next();
});
app.use(express.static('public'));

app.use('/', indexRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));