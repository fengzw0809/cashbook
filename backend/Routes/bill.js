const BillModel = require('../Models/Bill');

module.exports = {
  'get /bills': async (ctx) => {
    let { pageId, pageSize } = ctx.query;
    pageId = parseInt(pageId);
    pageSize = parseInt(pageSize);
    try {
      const bills = await BillModel.getBills((pageId - 1) * pageSize, pageSize);
      ctx.response.body = {
        ret: 1,
        data: {
          bills
        }
      };
    } catch (err) {
      ctx.response.body = {
        ret: 0
      }
    }
  },  
  'post /bill': async (ctx) => {  
    try {
      const { type, category, amount } = JSON.parse(ctx.request.body);
      const bill = await BillModel.addBill({ type, category, amount });
      ctx.response.body = {
        ret: 1,
        data: {
          bill
        }
      };
    } catch (err) {
      ctx.response.body = {
        ret: 0
      }
    }
  }
}
