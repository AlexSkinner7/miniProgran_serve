module.exports = {
    //开发dev，生产prod
    enviroment: 'dev',
    database: {
        dbName: '7yue',
        host: 'localhost',
        port: 3306,
        user: 'root',
        password: '19970917'
    },
    security: {
        secretKey: 'gluwveifnjcnal',
        expiresIn: 60 * 60 * 24 * 30
    },
    wx: {
        loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
        appId: 'wxd18c5c5a5fb4c85a',
        appSecret: '304f1bd86c845a12d3111bc8643a41fc'
    },
    yushu: {
        detailUrl: 'http://t.talelin.com/v2/book/id/%s',
        keywordUrl: 'http://t.talelin.com/v2/book/search?q=%s&count=%s&start=%s&summary=%s'
    },
    host: 'http://localhost:8888/'
}