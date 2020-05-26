const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

fs.readdirSync(__dirname).forEach(file => {
  if (!['.', '..', basename].includes(file)) {
    const stat = fs.statSync(file = path.join(__dirname, file));
    if (stat.isFile()) {
      const key = path.parse(file).name;
      config[key] = require(file);
    }
  }
})

module.exports = config;
