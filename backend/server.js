const http = require('http');
const Logger = require('logger').createLogger();

const app = require('./app');

const {
  cashbook : {
    host,
    port
  }
} = require('./Config');

http.createServer(app.callback()).listen(port, host, err => {
  if (err) {
    Logger.error(err);
  } else {
    Logger.info(`Server started at port ${port}.`);  
  }
});
