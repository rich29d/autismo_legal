// Helper functions
const path = require('path');

const ROOT = path.resolve(__dirname, '..');

const root = args => path.join(ROOT, 'src', args);

const rootNode = args => path.join(ROOT, args);

const resolve = dir => path.join(__dirname, '..', dir);

module.exports = {
  root,
  rootNode,
  resolve,
};
