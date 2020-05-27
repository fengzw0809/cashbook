const fs = require('fs');
const BillModel = require('../Models/Bill');
const CategoryModel = require('../Models/Category');

fs.readFile(`${__dirname}/data/bill.csv`, (err, data) => {
  if (err) {
    console.log(err);
  }
  data = data.toString();
  let rows = data.split('\n');
  for (let i = 1; i < rows.length; i++) {
    const [type, time, category, amount] = rows[i].split(',');
    BillModel.addBill({ type, time: new Date(parseInt(time)), category, amount });
  }
});

fs.readFile(`${__dirname}/data/categories.csv`, (err, data) => {
  if (err) {
    console.log(err);
  }
  data = data.toString();
  let rows = data.split('\n');
  for (let i = 1; i < rows.length; i++) {
    const [id, type, name] = rows[i].split(',');
    CategoryModel.addCategory({ id, type, name });
  }
});
