const Koa = require('koa');
const Router = require('koa-router');
const koaBody = require('koa-body');
const cors = require('koa2-cors');

const app = new Koa();
const router = new Router();

require('./routes')(router);

app
  .use(cors())
  .use(koaBody())
  .use(router.routes());

module.exports = app;
