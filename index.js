var Loader = require('./lib/loader');

exports.loader = function(orm) {
    return new Loader(orm);
};

exports.load = function(orm, schema, location) {
    return exports.loader(orm).load(schema, location);
};

exports.Loader = Loader;