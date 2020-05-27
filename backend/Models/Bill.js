const db = require('../Utils/DB');
const { Schema } = db;
const autoIncrement = require('mongoose-auto-increment');

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

BillModel.getBills = async function(offset, limit) {
  let bills = await this.find({})
                        .skip(offset)
                        .limit(limit);
  return bills;
} 

module.exports = BillModel;
