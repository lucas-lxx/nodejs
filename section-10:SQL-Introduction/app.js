const express = require('express');
const body_parser = require('body-parser')

const admin_router = require('./routes/admin');
const shop_router = require('./routes/shop');
const errorController = require('./controllers/error');
const { public_dir_path } = require('./util/path');

const port = 3000;

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(body_parser.urlencoded({extended: true}));
app.use(express.static(public_dir_path));

app.use('/', shop_router);
app.use('/admin', admin_router);
app.use(errorController.get404);

app.listen(port, '0.0.0.0');