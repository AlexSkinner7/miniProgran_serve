const Router = require('koa-router')
const router = new Router({
    prefix: '/v1/classic'
})
const {
    PositiveIntegerValidator,
    ClassicValidator
} = require('../../validators/validator')
const {
    Auth
} = require('../../../middlewares/auth')
const {
    AuthLevel
} = require('../../lib/enum')
const {
    Flow
} = require('../../../model/flow')
const {
    Art
} = require('../../../model/art')
const {
    Favor
} = require('../../../model/favor')


//获取最新一期
router.get('/latest', new Auth().m, async (ctx, next) => {
    const flow = await Flow.findOne({
        order: [
            ['index', 'DESC']
        ]
    })
    const art = await Art.getData(flow.artId, flow.type);
    art.setDataValue('index', flow.index)
    ctx.body = art
})

//获取下一期
router.get('/:index/next', new Auth().m, async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    });
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where: {
            index: index + 1
        }
    })
    const art = await Art.getData(flow.artId, flow.type);
    art.setDataValue('index', flow.index)
    ctx.body = art
})

//获取上一期
router.get('/:index/previous', new Auth().m, async (ctx, next) => {
    const v = await new PositiveIntegerValidator().validate(ctx, {
        id: 'index'
    });
    const index = v.get('path.index')
    const flow = await Flow.findOne({
        where: {
            index: index - 1
        }
    })
    const art = await Art.getData(flow.artId, flow.type);
    art.setDataValue('index', flow.index)
    ctx.body = art
})

//获取期刊详细信息
router.get('/:type/:id', new Auth().m, async ctx => {
    const v = await new ClassicValidator().validate(ctx)
    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))

    const artDetail = await new Art(id, type).getDetail(ctx.auth.uid)

    artDetail.art.setDataValue('like_status', artDetail.like_status)
    ctx.body = artDetail.art
})

//获取点赞期刊信息---当前用户喜欢的状态/当前期刊的点赞人数
router.get('/:type/:id/favor', new Auth().m, async (ctx, next) => {
    const v = await new ClassicValidator().validate(ctx)

    const id = v.get('path.id')
    const type = parseInt(v.get('path.type'))

    const favor = await Favor.findOne({
        where: {
            type: type,
            artId: id,
            uid: ctx.auth.uid
        }
    })
    const like_status = favor ? 1 : 0;
    const art = await Art.getData(id, type);
    ctx.body = {
        like_status: like_status,
        fav_nums: art.fav_nums
    }
})

router.get('/favor', new Auth().m, async (ctx, next) => {
    const favor = await Favor.getMyClassicFavors(ctx.auth.uid);
    ctx.body = favor
})
module.exports = router