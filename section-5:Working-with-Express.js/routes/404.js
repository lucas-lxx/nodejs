const path = require('path');
const root_dir_path = require('../util/path');

const router = (req, res, next) => {
  res.status(404).render('404', {doc_title: 'CatShop is not Well!'})
}

module.exports = router;