const Koa = require('koa');
const Router = require('koa-router');
const path = require('path');
const koaBody = require('koa-body');

const app = new Koa();
const router = new Router();

require('./routes')(router);

app
  .use(koaBody())
  .use(router.routes());

module.exports = app;
