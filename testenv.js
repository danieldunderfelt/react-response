var fs = require('fs');
var path = require('path');

var babelrc = fs.readFileSync(path.resolve(__dirname, './.babelrc'));
var config;

try {
    config = JSON.parse(babelrc)
} catch (err) {
    console.error('==>     ERROR: Error parsing your .babelrc.');
    console.error(err);
}

require('babel-core/register')(config);

if (!require('piping')({
        hook: true,
        ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
    return
}