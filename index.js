var pkg = require('./package.json');
module.export = require('./lib/' + pkg.library.entry);