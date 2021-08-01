const {
    Sequelize,
    Model
} = require('sequelize');
const {
    unset,
    clone,
    isArray
} = require('lodash')
const {
    dbName,
    user,
    password,
    host,
    port
} = require('../config/config').database
//logging是否显示具体sql语句
const sequelize = new Sequelize(dbName, user, password, {
    host,
    port,
    logging: true,
    timezone: '+08:00',
    dialect: 'mysql',
    define: {
        //时间戳
        timestamps: true,
        //增加delete_time
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        scopes: {
            bh: {
                attributes: {
                    exclude: ['updatedAt', 'deletedAt', 'createdAt']
                }
            }
        }

    }
})
//用于创建sequelize模型
sequelize.sync({
    force: false
})


Model.prototype.toJSON = function () {
    // let data = this.dataValues
    let data = clone(this.dataValues)
    unset(data, 'updated_at')
    unset(data, 'created_at')
    unset(data, 'deleted_at')
    //拼接image静态资源url
    for (key in data) {
        if (key === 'image') {
            if (!data[key].startsWith('http'))
                data[key] = global.config.host + data[key]
        }
    }
    //排除特定字段
    if (isArray(this.exclude)) {
        this.exclude.forEach(
            (value) => {
                unset(data, value)
            }
        )
    }
    return data
}

module.exports = {
    sequelize
}