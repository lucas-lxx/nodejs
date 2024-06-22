const path = require('path');

const root_dir_path = path.dirname(require.main.filename);
const view_dir_path = path.join(root_dir_path, 'view');
const routes_dir_path = path.join(root_dir_path, 'routes');
const public_dir_path = path.join(root_dir_path, 'public');

module.exports = {
  root_dir_path,
  view_dir_path,
  routes_dir_path
}