const {
    Movies,
    Sentences,
    Music
} = require('./classic')

const {
    NotFound
} = require('../core/http-exception')
const {
    Op
} = require('sequelize')
const {
    flatten
} = require('lodash')

class Art {
    constructor(id, type) {
        this.artId = id
        this.type = type
    }
    async getDetail(uid) {
        const {
            Favor
        } = require('./favor')
        const art = await Art.getData(this.artId, this.type)
        if (!art) {
            throw new NotFound()
        }

        const like = await Favor.userLikeIt(
            this.artId, this.type, uid)
        // art.setDataValue('like_status',like)
        return {
            art,
            like_status: like
        }
    }
    static async getData(artId, type) {
        const finder = {
            where: {
                id: artId
            }
        }
        let artData
        switch (type) {
            case 100:
                artData = await Movies.scope('bh').findOne(finder)
                break;

            case 200:
                artData = await Music.scope('bh').findOne(finder)
                break;
            case 300:
                artData = await Sentences.scope('bh').findOne(finder)
                break;
            case 400:
                //防止循环导入
                const {
                    Book
                } = require('./book')
                artData = await Book.scope('bh').findOne(finder)
                if (!artData) {
                    artData = await Book.create({
                        id: artId
                    })
                }
                break;
            default:
                break;
        }
        // if (artData && artData.image) {
        //     let imgUrl = artData.dataValues.image
        //     artData.dataValues.image = global.config.host + imgUrl
        // }
        return artData

    }
    static async getList(artInfoList) {
        const artInfoObj = {
            100: [],
            200: [],
            300: [],
        }
        for (let artInfo of artInfoList) {
            artInfoObj[artInfo.type].push(artInfo.artId)
        }
        const arts = []
        for (let key in artInfoObj) {
            const ids = artInfoObj[key]
            if (ids.length === 0) {
                continue
            }

            key = parseInt(key)
            arts.push(await Art._getListByType(ids, key))
        }

        return flatten(arts)
    }

    static async _getListByType(ids, type) {
        let arts = []
        const finder = {
            where: {
                id: {
                    [Op.in]: ids
                }
            }
        }
        const scope = 'bh'
        switch (type) {
            case 100:
                arts = await Movies.scope(scope).findAll(finder)
                break
            case 200:
                arts = await Music.scope(scope).findAll(finder)
                break
            case 300:
                arts = await Sentences.scope(scope).findAll(finder)
            case 400:
                break
            default:
                break
        }
        // for (let artData of arts) {
        //     if (artData && artData.image) {
        //         let imgUrl = artData.dataValues.image
        //         artData.dataValues.image = global.config.host + imgUrl
        //     }
        // }
        return arts
    }
}

module.exports = {
    Art
}