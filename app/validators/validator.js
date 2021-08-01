const {
    Rule,
    LinValidator
} = require('../../core/lin-validator-v2')
const {
    User
} = require('../../model/user')
const {
    LoginType,
    ClassicType
} = require('../lib/enum')



class PositiveIntegerValidator extends LinValidator {
    constructor() {
        super();
        this.id = [new Rule('isInt', '不是正整数', {
            min: 1
        })]
    }
}

class RegisterValidator extends LinValidator {
    constructor() {
        super();
        this.email = [new Rule('isEmail', '不符合Email规范')];
        this.password1 = [new Rule('isLength', '不符合密码长度规范', {
            min: 8,
            max: 32
        }), new Rule('matches', '不符合密码规则', '^(?![0-9]+$)(?![a-zA-Z]+$)[0-9a-zA-Z]')];
        this.password2 = this.password1;
        this.nickname = [new Rule('isLength', '不符合昵称规范', {
            min: 4,
            max: 32
        })];
    }
    //验证password1和2
    validatePassword(vals) {
        const password1 = vals.body.password1
        const password2 = vals.body.password2
        if (password1 !== password2) {
            throw new Error('两个密码不相同')
        }
    }
    async validateEmail(vals) {
        const email = vals.body.email
        const user = await User.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            throw new Error('用户已存在')
        }
    }
}

class tokenValidator extends LinValidator {
    constructor() {
        super()
        this.account = [new Rule('isLength', '不符合账号规范', {
            min: 4,
            max: 32
        })]
        this.secret = [new Rule('isOptional'), new Rule('isLength', '密码最少六个字符', {
            min: 6,
            max: 128
        })]
    }

    validateTokenType(vals) {
        if (!vals.body.type) {
            throw new Error('type是必须参数')
        }

        if (!LoginType.isThisType(vals.body.type)) {
            throw new Error('type参数不合法')
        }
    }
}

class verifyValidator extends LinValidator {
    constructor() {
        super()
        this.token = [new Rule('isLength', '不符合账号规范', {
            min: 1
        })]
    }
}


class likeValidator extends PositiveIntegerValidator {
    constructor() {
        super();
        const checker = new Checker(ClassicType)
        this.validateType = checker.checkType.bind(checker)
    }
}
class dislikeValidator extends PositiveIntegerValidator {
    constructor() {
        super();
        const checker = new Checker(ClassicType)
        this.validateType = checker.checkType.bind(checker)
    }
}

class ClassicValidator extends PositiveIntegerValidator {
    constructor() {
        super();
        const checker = new Checker(ClassicType)
        this.validateType = checker.checkType.bind(checker)
    }
}

class Checker {
    constructor(type) {
        this.enumType = type
    }
    checkType(vals) {
        let type = vals.body.type || vals.path.type
        if (!type) {
            throw new Error('type是必须参数')
        }
        type = parseInt(type)
        if (!this.enumType.isThisType(type)) {
            throw new Error('type参数不合法')
        }
    }
}
class SearchValidator extends LinValidator {
    constructor() {
        super()
        this.q = [
            new Rule('isLength', '搜索关键词不能为空', {
                min: 1,
                max: 16
            })
        ]
        this.start = [
            new Rule('isInt', '不符合规范', {
                min: 0,
                max: 60000
            }),
            new Rule('isOptional', '', 0)
        ]
        this.count = [
            new Rule('isInt', '不符合规范', {
                min: 1,
                max: 20
            }),
            new Rule('isOptional', '', 20)
        ]

    }
}

class AddShortCommentValidator extends PositiveIntegerValidator {
    constructor() {
        super()
        this.content = [
            new Rule('isLength', '必须在1到12个字符之间', {
                min: 1,
                max: 12
            })
        ]
    }
}



module.exports = {
    PositiveIntegerValidator,
    RegisterValidator,
    tokenValidator,
    verifyValidator,
    likeValidator,
    dislikeValidator,
    ClassicValidator,
    SearchValidator,
    AddShortCommentValidator
}