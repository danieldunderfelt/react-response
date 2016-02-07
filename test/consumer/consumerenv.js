require('../helpers/testenv')

if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i
})) {
    return
}

/*var nomo = require('node-monkey').start(),
    bunyan = require('bunyan')

var log = bunyan.createLogger({
    name: 'app',
    streams: [
        {
            level: 'info',
            stream: nomo.stream
        }
    ]
})*/

require('./test')