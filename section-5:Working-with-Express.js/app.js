const path = require('path');

const express = require('express');
const body_parser = require('body-parser')

const admin_router = require('./routes/admin');
const shop_router = require('./routes/shop');
const route_not_found = require('./routes/404');
const root_dir_path = require('./util/path');

const port = 3000;

const app = express();

app.use(body_parser.urlencoded({extended: true}));
app.use(express.static(path.join(root_dir_path, 'public')));

app.use(admin_router);
app.use(shop_router);
app.use(route_not_found);

app.listen(port, '192.168.1.79');
app.listen(port, '127.0.0.1');