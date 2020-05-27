const fs = require('fs');
const path = require('path');

const basename = path.basename(__filename);

module.exports = router => {
  fs.readdirSync(__dirname).forEach(file => {
    if (!['.', '..', basename].includes(file)) {
      const stat = fs.statSync(file = path.join(__dirname, file));
      if (stat.isFile()) {
        let routes = require(file);
        for (route in routes) {
          let [method, pathname] = route.split(/\s+/);
          const middleware = routes[route];
          router[method.toLowerCase()](pathname, middleware);
        }
      }
    }
  })
}
