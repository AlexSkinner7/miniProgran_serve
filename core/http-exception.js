class HttpException extends Error {
    constructor(msg = '服务器错误', errorCode = 10000, code = 400) {
        super();
        this.msg = msg;
        this.errorCode = errorCode;
        this.code = code;
    }
}

class ParameterException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '参数错误';
        this.errorCode = errorCode || 10000
    }
}

class SuccessException extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || 'ok'
        this.errorCode = errorCode || 0
        this.code = 200
    }
}

class NotFound extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '未找到'
        this.errorCode = errorCode || 10000
        this.code = 404
    }
}
class AuthFailed extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '授权失败'
        this.errorCode = errorCode || 10004
        this.code = 401
    }
}

class Forbbiden extends HttpException {
    constructor(msg, errorCode) {
        super()
        this.msg = msg || '禁止访问'
        this.errorCode = errorCode || 10006
        this.code = 403
    }
}
class likeError extends HttpException {
    constructor(msg) {
        super()
        this.msg = msg || '你已经点过赞了'
        this.errorCode = 60001
        this.code = 400
    }
}
class dislikeError extends HttpException {
    constructor(msg) {
        super()
        this.msg = msg || '你已经取消点赞了'
        this.errorCode = 60002
        this.code = 400
    }
}

module.exports = {
    HttpException,
    ParameterException,
    SuccessException,
    NotFound,
    AuthFailed,
    Forbbiden,
    likeError,
    dislikeError
}