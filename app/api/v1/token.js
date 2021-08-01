const Router = require('koa-router')

const {
    tokenValidator,
    verifyValidator
} = require('@validator')
const {
    LoginType
} = require('../../lib/enum')
const {
    User
} = require('../../../model/user')
const {
    generateToken,
    vertifyToken
} = require('../../../core/util')
const {
    Auth
} = require('../../../middlewares/auth')
const {
    WXManager
} = require('../../../service/wx')


const router = new Router({
    prefix: '/v1/token'
})

router.post('/', async (ctx, next) => {
    const v = await new tokenValidator().validate(ctx)
    let token;
    switch (v.get('body.type')) {
        case LoginType.USER_EMAIL:
            token = await emailLogin(v.get('body.account'), v.get('body.secret'))
            break;
        case LoginType.USER_MINI_PROGRAM:
            token = await WXManager.codeToToken(v.get('body.account'))
            break;
        case LoginType.USER_MOBILE:

            break;
        default:
            break;
    }

    ctx.body = {
        token
    };
})

router.post('/verify', async (ctx, next) => {
    const v = await new verifyValidator().validate(ctx)

    const res = await vertifyToken(v.get('body.token'))
    ctx.body = {
        is_valider: res
    }
})


async function emailLogin(account, secret) {
    const user = await User.vertifyEmailLogin(account, secret);
    const token = generateToken(user.id, Auth.USER);
    return token
}


module.exports = router