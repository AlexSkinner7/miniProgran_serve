function isThisType(val) {
    for (let key in this) {
        if (this[key] === val) {
            return true
        }
    }
    return false
}

const LoginType = {
    USER_MINI_PROGRAM: 100,
    USER_EMAIL: 101,
    USER_MOBILE: 102,
    ADMIN_EMAIL: 200,
    isThisType
}

const ClassicType = {
    MOVIES: 100,
    MUSIC: 200,
    SENTENCES: 300,
    BOOK: 400,
    isThisType
}

const AuthLevel = {
    PUBLIC_LEVEL: 0,
    USER_LEVEL: 7,
    ADMIN_LEVEL: 15,
    SUPER_ADMIN_LEVEL: 31
}

module.exports = {
    LoginType,
    AuthLevel,
    ClassicType
}