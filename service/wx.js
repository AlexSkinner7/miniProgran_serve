const axios = require('axios')

const Utils = require("util");
const {
    wx
} = require('../config/config')
const {
    AuthFailed
} = require('../core/http-exception')
const {
    User
} = require('../model/user')
const {
    generateToken
} = require('../core/util')
const {
    Auth
} = require('../middlewares/auth')

class WXManager {
    static async codeToToken(code) {
        const url = Utils.format(wx.loginUrl, wx.appId, wx.appSecret, code)
        const res = await axios.get(url)
        if (res.status !== 200) {
            throw new AuthFailed('openid获取失败')
        }
        const errcode = res.data.errcode
        if (errcode) {
            throw new AuthFailed('openid获取失败:' + errcode)
        }

        let user = await User.getUserByOpenid(res.data.openid);
        if (!user) {
            user = await User.registerUserByOpenid(res.data.openid);
        }
        const auth = new Auth();
        const token = generateToken(user.id, auth.USER)
        return token
    }
}

module.exports = {
    WXManager
}