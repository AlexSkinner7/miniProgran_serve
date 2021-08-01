const basicAuth = require('basic-auth');
const jwt = require('jsonwebtoken')

const {
    Forbbiden
} = require('../core/http-exception')

class Auth {
    constructor(level) {
        this.LEVEL = level || 1
        this.USER = 8
        this.ADMIN = 16
        this.SUPER_ADMIN = 32
    }
    get m() {
        return async (ctx, next) => {
            const userToken = basicAuth(ctx.req);
            let errMsg = 'token不合法'

            if (!userToken || !userToken.name) {
                throw new Forbbiden(errMsg)
            }
            try {
                var decode = jwt.verify(userToken.name, global.config.security.secretKey)
            } catch (error) {
                if (error.name == 'TokenExpiredError') {
                    errMsg = 'token已过期'
                }
                throw new Forbbiden(errMsg)
            }
            //从令牌中获取
            ctx.auth = {
                uid: decode.uid,
                scope: decode.scope
            }

            if (decode.scope < this.LEVEL) {
                errMsg = '权限不足'
                throw new Forbbiden(errMsg)
            }
            await next()

        }
    }
}

module.exports = {
    Auth
}