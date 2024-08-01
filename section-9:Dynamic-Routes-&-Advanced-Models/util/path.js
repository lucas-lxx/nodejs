const path = require('path');

const root_dir_path = path.dirname(require.main.filename);
const views_dir_path = path.join(root_dir_path, 'views');
const routes_dir_path = path.join(root_dir_path, 'routes');
const public_dir_path = path.join(root_dir_path, 'public');
const data_dir_path =path.join(root_dir_path, 'data');

module.exports = {
  root_dir_path,
  views_dir_path,
  routes_dir_path,
  public_dir_path,
  data_dir_path
}