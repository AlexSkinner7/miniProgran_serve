const {
    sequelize
} = require('../core/db')
const {
    Sequelize,
    Model,
    Op
} = require('sequelize')
const {
    likeError,
    dislikeError
} = require('../core/http-exception')

const {
    Art
} = require('./art')
//1、查询是否存在，2、数据库事务---查询和增加：获取当前fav——nums +1 返回给flow模型加1
class Favor extends Model {
    static async like(artId, type, uid) {
        const favor = await Favor.findOne({
            where: {
                artId,
                type,
                uid
            }
        })

        if (favor) {
            throw new likeError()
        }
        return sequelize.transaction(async t => {
            await Favor.create({
                artId,
                type,
                uid
            }, {
                transaction: t
            })
            const artData = await Art.getData(artId, type);
            await artData.increment('fav_nums', {
                by: 1,
                transaction: t
            })
        })


    }
    static async dislike(artId, type, uid) {
        const favor = await Favor.findOne({
            where: {
                artId,
                type,
                uid
            }
        })

        if (!favor) {
            throw new dislikeError()
        }
        return sequelize.transaction(async t => {
            await favor.destroy({
                force: true,
                transaction: t
            })
            const artData = await Art.getData(artId, type);
            await artData.decrement('fav_nums', {
                by: 1,
                transaction: t
            })
        })
    }

    static async getMyClassicFavors(uid) {
        const arts = await Favor.findAll({
            where: {
                uid,
                type: {
                    [Op.not]: 400
                }
            }
        })
        if (!arts) {
            throw new global.errs.NotFound()
        }

        return await Art.getList(arts)
    }

    static async userLikeIt(art_id, type, uid) {
        const favor = await Favor.findOne({
            where: {
                uid,
                art_id,
                type,
            }
        })
        return favor ? true : false
    }
    static async getBookFavor(uid, bookID) {
        const favorNums = await Favor.count({
            where: {
                art_id: bookID,
                type: 400
            }
        })
        const myFavor = await Favor.findOne({
            where: {
                art_id: bookID,
                uid,
                type: 400
            }
        })
        return {
            fav_nums: favorNums,
            like_status: myFavor ? 1 : 0
        }
    }
}

Favor.init({
    uid: Sequelize.STRING,
    artId: Sequelize.STRING,
    type: Sequelize.STRING
}, {
    sequelize,
    tableName: 'favor'
})



module.exports = {
    Favor
}