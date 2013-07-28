var Loader = require('./lib/loader');

exports.loader = function(orm) {
    return new Loader(orm);
};

exports.load = function(orm) {
    var args = Array.prototype.slice.call(arguments, 1);
    var loader = new Loader(orm);
    return loader.load.apply(loader, args);
};

exports.Loader = Loader;