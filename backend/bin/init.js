const fs = require('fs');
const { BillModel, CategoryModel } = require('../Models');

fs.readFile(`${__dirname}/data/bill.csv`, (err, data) => {
  if (err) {
    console.log(err);
  }
  data = data.toString();
  let rows = data.split('\n');
  for (let i = 1; i < rows.length; i++) {
    const [type, time, category, amount] = rows[i].split(',');
    // 写入数据库
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
    // 写入数据库
  }
});
