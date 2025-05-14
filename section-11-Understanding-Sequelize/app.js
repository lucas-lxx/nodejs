const express = require('express');
const body_parser = require('body-parser')

const admin_router = require('./routes/admin');
const shop_router = require('./routes/shop');
const errorController = require('./controllers/error');
const { public_dir_path } = require('./util/path');
const sequelize = require('./util/database');

const User = require('./models/user');
const Product = require('./models/product');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(body_parser.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static(public_dir_path));

const user_id_for_gambiarra = 'ad245720-0a65-11f0-9b58-25a4ffff91f2';

app.use((req, res, next) => {
  User.findByPk(user_id_for_gambiarra)
  .then(user => {
    req.user = user;
    next();
  })
})

app.use('/', shop_router);
app.use('/admin', admin_router);
app.use(errorController.get404);

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'})
User.hasMany(Product);
User.hasOne(Cart);
// Cart.hasMany(CartItem);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(User, { through: CartItem });


// sequelize.sync({force: true})
sequelize.sync()
.then(_ => {
  console.log("==============sequelize sync start===============");
  return User.findByPk(user_id_for_gambiarra);
})
.then(user => {
  if (!user) return User.create({ id: user_id_for_gambiarra, name: 'Lucas', email: 'test@test.com'})
  console.log(`User: ${JSON.stringify(user, null, 2)}`)
  return user;
})
.then(user => {
  return user.getCart();
})
.then(cart => {
  if (!cart) return Cart.create({ userId: user_id_for_gambiarra });
  return cart;
})
.then(cart => {
  console.log("User cart on app.js===========");
  console.log(cart);
  console.log("User cart on app.js===========");
})
.then(_ => {
  app.listen(process.env.PORT, process.env.HOST);
  console.log(`app listening on ${process.env.PORT}`)
  console.log("==============sequelize sync end=================");
})
.catch(err => { 
  console.log(err);
});
