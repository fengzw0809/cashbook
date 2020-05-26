const db = require('./Utils/DB');
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

const BillSchema = new Schema({
  type: {
    type: String,
    enum: {
      values: ['0', '1']
    }
  },
  time: Date,
  category: String,
  amount: String
});

BillSchema.plugin(autoIncrement.plugin, {
  model: 'bill',
  startAt: 1,
  incrementBy: 1
});

const CategoryModel = db.model('category', CategorySchema);
const BillModel = db.model('bill', BillSchema);

BillModel.addBill = function ({ type, category, amount, time }) {
  if (!time) {
    time = new Date();
  }
  return this.create({
    type,
    category,
    amount,
    time
  });
}

CategoryModel.addCategory = function ({ id, type, name }) {
  return this.create({
    id,
    type,
    name
  });
}

exports.CategoryModel = CategoryModel;
exports.BillModel = BillModel;
