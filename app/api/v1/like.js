const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/like'
})
const {
    likeValidator,
    dislikeValidator
} = require('../../validators/validator')
const {
    Auth
} = require('../../../middlewares/auth')
const {
    AuthLevel
} = require('../../lib/enum')
const {
    Favor
} = require('../../../model/favor')
const {
    success
} = require('../../lib/helper')



router.post('/', new Auth().m, async (ctx, next) => {
    const v = await new likeValidator().validate(ctx, {
        id: 'art_id'
    });
    await Favor.like(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid);
    success()
})


router.post('/cancel', new Auth().m, async (ctx, next) => {
    const v = await new dislikeValidator().validate(ctx, {
        id: 'art_id'
    });
    await Favor.dislike(v.get('body.art_id'), v.get('body.type'), ctx.auth.uid);
    success()
})




module.exports = router