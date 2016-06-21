var ppromisify = require('./ppromisify.js')

module.exports = ppromisify(
    require('jsftp'),
    {
        '<call>' : ppromisify.constructor_return_value(
        {
            'ls'        : ppromisify.callback_err_res,
            'get'       : ppromisify.callback_err_res,
            'put'       : ppromisify.callback_err_res,
            'auth'      : ppromisify.callback_err_res,
            'list'      : ppromisify.callback_err_res,
            'rename'    : ppromisify.callback_err_res,
            'raw'       : ppromisify.property(
            {
                'cwd'   : ppromisify.callback_err_res,
                'mkd'   : ppromisify.callback_err_res,
                'pwd'   : ppromisify.callback_err_res,
                'rmd'   : ppromisify.callback_err_res,
                'abor'  : ppromisify.callback_err_res,
                'cdup'  : ppromisify.callback_err_res,
                'dele'  : ppromisify.callback_err_res,
                'feat'  : ppromisify.callback_err_res,
                'list'  : ppromisify.callback_err_res,
                'mdtm'  : ppromisify.callback_err_res,
                'mode'  : ppromisify.callback_err_res,
                'nlst'  : ppromisify.callback_err_res,
                'noop'  : ppromisify.callback_err_res,
                'opts'  : ppromisify.callback_err_res,
                'pass'  : ppromisify.callback_err_res,
                'pasv'  : ppromisify.callback_err_res,
                'quit'  : ppromisify.callback_err_res,
                'retr'  : ppromisify.callback_err_res,
                'rnfr'  : ppromisify.callback_err_res,
                'rnto'  : ppromisify.callback_err_res,
                'site'  : ppromisify.callback_err_res,
                'size'  : ppromisify.callback_err_res,
                'stat'  : ppromisify.callback_err_res,
                'stor'  : ppromisify.callback_err_res,
                'syst'  : ppromisify.callback_err_res,
                'type'  : ppromisify.callback_err_res,
                'user'  : ppromisify.callback_err_res,
                'xrmd'  : ppromisify.callback_err_res,
                'chmod' : ppromisify.callback_err_res,
            }),
        }),
    }
)