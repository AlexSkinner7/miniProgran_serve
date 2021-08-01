const bcrypt = require('bcryptjs')

const {
    sequelize
} = require('../core/db')
const {
    Sequelize,
    Model
} = require('sequelize')
const {
    NotFound,
    AuthFailed
} = require('../core/http-exception')

class User extends Model {
    static async vertifyEmailLogin(email, plainPassword) {
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (!user) {
            throw new NotFound('用户未找到')
        }
        const isRight = bcrypt.compareSync(plainPassword, user.password)
        if (!isRight) {
            throw new AuthFailed('账号密码错误')
        }
        return user
    }

    static async getUserByOpenid(openid) {
        const user = await User.findOne({
            where: {
                openid
            }
        })
        return user
    }
    static async registerUserByOpenid(openid) {
        const user = await User.create({
            where: {
                openid
            }
        })
        return user
    }
}

User.init({
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nickname: Sequelize.STRING,
    email: {
        type: Sequelize.STRING(128),
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        set(val) {
            const salt = bcrypt.genSaltSync(10)
            const psw = bcrypt.hashSync(val, salt);
            this.setDataValue('password', psw)
        }
    },
    openid: {
        type: Sequelize.STRING(64),
        unique: true
    }
}, {
    sequelize,
    tableName: 'user'
})

module.exports = {
    User
}