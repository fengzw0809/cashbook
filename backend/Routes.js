const { BillModel, CategoryModel } = require('./Models');

const routes = {
  'get /bills': async (ctx) => {
    let { pageId, pageSize } = ctx.query;
    pageId = parseInt(pageId);
    pageSize = parseInt(pageSize);
    try {
      const bills = await BillModel.getBills((pageId - 1) * pageSize, pageSize);
      ctx.response.body = {
        ret: 1,
        bills
      };
    } catch (err) {
      ctx.response.body = {
        ret: 0
      }
    }
  },  
  'post /bill': async (ctx) => {  
    try {
      const { type, category, amount } = ctx.request.body;
      const bill = await BillModel.addBill({ type, category, amount });
      ctx.response.body = {
        ret: 1,
        bill
      };
    } catch (err) {
      ctx.response.body = {
        ret: 0
      }
    }
  }
}

module.exports = (router) => {
  for (let route in routes) {
    const [method, pathname] = route.split(/\s+/);
    const middleware = routes[route];
    router[method](pathname, middleware);
  }
};
