var path = require('path');
var fs = require('fs');

var existsSync = fs.existsSync || path.existsSync;

module.exports = {

    load: function load(path, cts, prefix) {
        var contents = cts || {};
        prefix = prefix || '';

        if (existsSync(path)) {
            fs.readdirSync(path).forEach(readAndWatch);
        }

        return contents;

        function readAndWatch(filename) {
            if (filename.match(/^\./)) {
                // skip files starting with point
                return;
            }
            var file = path + '/' + filename;
            var ext = filename.split('.').pop();
            if (fs.statSync(file).isDirectory()) {
                if (existsSync(file + '/index.js')) {
                    contents[filename] = requireFile(file);
                } else {
                    load(path + '/' + filename, contents, prefix + filename + '/');
                }
            } else {
                var name = prefix + filename.replace('.' + ext, '');
                contents[name] = requireFile(file);
            }
        }
    }
};

function requireFile(file) {
    return require(file);
}

