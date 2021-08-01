const Router = require('koa-router')

const {
    RegisterValidator
} = require('../../validators/validator')
const {
    User
} = require('../../../model/user')
const {
    success
} = require('../../lib/helper')

const router = new Router({
    prefix: '/v1/user'
})

router.post('/register', async (ctx, next) => {
    const v = await new RegisterValidator().validate(ctx)

    const user = {
        nickname: v.get('body.nickname'),
        email: v.get('body.email'),
        password: v.get('body.password1')
    }
    User.create(user)
    success()
})

module.exports = router