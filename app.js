require('module-alias/register')
const path = require('path')
const Koa = require('koa')
const InitManager = require('./core/init')
const parser = require('koa-bodyparser')
const catchError = require('./middlewares/exception')
const static = require('koa-static')

const app = new Koa();
const cors = require('koa-cors')
app.use(cors())
app.use(catchError)
app.use(parser())
app.use(static(path.join(__dirname, './static')))


InitManager.initCore(app);

app.listen(8888)