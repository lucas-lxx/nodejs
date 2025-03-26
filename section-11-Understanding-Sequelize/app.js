const express = require('express');
const body_parser = require('body-parser')

const admin_router = require('./routes/admin');
const shop_router = require('./routes/shop');
const errorController = require('./controllers/error');
const { public_dir_path } = require('./util/path');
const sequelize = require('./util/database');

const port = 3000;

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(body_parser.urlencoded({extended: true}));
app.use(express.static(public_dir_path));

app.use((req, res, next) => {
  User.findByPk('06006ac0-05dc-11f0-93f3-3f425e5ae301')
  .then(user => {
    req.user = user;
    next();
  })
})

app.use('/', shop_router);
app.use('/admin', admin_router);
app.use(errorController.get404);

sequelize.sync()
.then(result => {
  return User.findByPk('06006ac0-05dc-11f0-93f3-3f425e5ae301');
})
.then(user => {
  if (!user) return User.create({ name: 'Lucas', email: 'test@test.com'})
  return user;
})
.then(user => {
  console.log(`\x1b[35mUser: ${user}\x1b[0m`)
  app.listen(process.env.PORT, process.env.HOST);
  console.log(`app listening on ${process.env.PORT}`)
})
.catch(err => { 
  console.log(err);
});
