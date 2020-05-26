const { BillModel, CategoryModel } = require('./Models');

const routes = {
  'get /bill': async (ctx) => {

  },  
  'post /bill': async (ctx) => {  

  }
}

module.exports = (router) => {
  for (route in routes) {
    const [method, pathname] = routes.split(/\s+/);
    const middleware = routes[route];
    router[method](pathname, middleware);
  }
};
