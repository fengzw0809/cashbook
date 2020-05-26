const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');
const Logger = require('logger').createLogger();

const {
  db: {
    host,
    port,
    database,
    username,
    password
  }
} = require('../Config');

mongoose.Promise = Promise;

mongoose
  .connect(`mongodb://${username}:${password}@${host}:${port}/${database}`, {useNewUrlParser: true})
  .then(() => Logger.info(`database ${database} connected!`), Logger.error);

autoIncrement.initialize(mongoose);

module.exports = mongoose;
