const {
    sequelize
} = require('../core/db')
const {
    Sequelize,
    Model
} = require('sequelize')


//配置项
const classicFields = {
    image: Sequelize.STRING,
    content: Sequelize.STRING,
    pubdate: Sequelize.STRING,
    fav_nums: {
        type: Sequelize.STRING,
        defaultValue: 0
    },
    title: Sequelize.STRING,
    type: Sequelize.STRING
}

//Movies
class Movies extends Model {

}

Movies.init(classicFields, {
    sequelize,
    tableName: 'movie'
})

//Sentences
class Sentences extends Model {

}

Sentences.init(classicFields, {
    sequelize,
    tableName: 'sentence'
})

//Music
class Music extends Model {

}


const musicFileds = Object.assign({
    url: Sequelize.STRING
}, classicFields)

Music.init(musicFileds, {
    sequelize,
    tableName: 'music'
})




module.exports = {
    Movies,
    Sentences,
    Music
}