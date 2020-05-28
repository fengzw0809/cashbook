const db = require('../Utils/DB');
const { Schema } = db;
const autoIncrement = require('mongoose-auto-increment');

const CategorySchema = new Schema({
  id: String,
  type: {
    type: String,
    enum: {
      values: ['0', '1']
    }
  },
  name: String
});

const CategoryModel = db.model('category', CategorySchema);

CategoryModel.addCategory = function ({ id, type, name }) {
  return this.create({
    id,
    type,
    name
  });
}

CategoryModel.getCategories = async function() {
  let categories = await this.find({});
  return categories;
} 

module.exports = CategoryModel;
