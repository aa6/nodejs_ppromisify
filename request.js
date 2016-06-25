var ppromisify = require('./ppromisify.js')

module.exports = ppromisify(
    require('request'),
    {
        '<call>' : ppromisify.callback_err_res,
        'del'    : ppromisify.callback_err_res,
        'get'    : ppromisify.callback_err_res,
        'put'    : ppromisify.callback_err_res,
        'head'   : ppromisify.callback_err_res,
        'post'   : ppromisify.callback_err_res,
        'patch'  : ppromisify.callback_err_res,
    }
)