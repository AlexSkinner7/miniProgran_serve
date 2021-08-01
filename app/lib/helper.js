const {
    SuccessException
} = require('../../core/http-exception')

function success() {
    throw new SuccessException()
}
module.exports = {
    success
}