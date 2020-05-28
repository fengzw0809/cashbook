const CategoryModel = require('../Models/Category');

module.exports = {
  'get /categories': async (ctx) => {
    try {
      const categories = await CategoryModel.getCategories();
      ctx.response.body = {
        ret: 1,
        data: {
          categories
        }
      };
    } catch (err) {
      ctx.response.body = {
        ret: 0
      }
    }
  },  
}
