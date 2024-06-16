const path = require('path');
const root_dir_path = require('../util/path');

const router = (req, res, next) => {
  res.status(404).sendFile(path.join(root_dir_path, 'views', '404.html'));
}

module.exports = router;