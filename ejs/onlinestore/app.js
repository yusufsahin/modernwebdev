const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const dotenv = require('dotenv');
const indexRoutes= require('./routes/indexRoutes');
const productRoutes= require('./routes/productRoutes');

dotenv.config();
const app = express();

app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.use(session({
    secret:'store-secret',
    resave:false,
    saveUninitialized:true
}));
app.use((req,res,next)=>{
    res.locals.cart=req.session.cart || [];
    next();
})

app.use('/',indexRoutes);
app.use('/products',productRoutes);

const PORT = process.env.PORT || 3010;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));