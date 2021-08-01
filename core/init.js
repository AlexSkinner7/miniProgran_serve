const Router = require('koa-router')
const requireDirectory = require('require-directory')

class InitManager {

    static initCore(app) {
        InitManager.app = app;
        InitManager.initLoadRouters();
        InitManager.loadConfig();
    }

    static initLoadRouters() {
        requireDirectory(module, `${process.cwd()}/app/api`, {
            visit: whenLoadModule
        })

        function whenLoadModule(obj) {
            if (obj instanceof Router) {
                InitManager.app.use(obj.routes())
            }
        }
    }

    static loadConfig(path = '') {
        const configPath = path || `${process.cwd()}/config/config.js`;
        const configParam = require(configPath);
        global.config = configParam;
    }

    static loadHttpException() {
        const errors = require('./http-exception')
        global.errs = errors
    }
}

module.exports = InitManager