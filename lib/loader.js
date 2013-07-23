var modules = require('./modules');
var path = require('path');
var fs = require('fs');
var path = require('path');

var existsSync = fs.existsSync || path.existsSync;

module.exports = exports = Loader;

function Loader(name) {
    // just save everything we get
    this.name = name;

    if (typeof name === 'object') {
        this.adapterFactory = name;
        this.name = this.adapterFactory.name;
    } else if (name.match(/^\//)) {
        // try absolute path
        this.adapterFactory = require(name);
    } else if (existsSync(__dirname + '/adapters/' + name + '.js')) {
        // try built-in adapter
        this.adapterFactory = require('./adapters/' + name);
    } else {
        // try foreign adapter
        try {
            this.adapterFactory = require('models-' + name);
        } catch (e) {
            return console.log('\nWARNING: Models adapter "' + name + '" is not installed,\nso your models would not work, to fix run:\n\n    npm install jugglingdb-' + name, '\n');
        }
    }

}

/**
 * load models from location.
 *
 * @param schema
 * @param location
 * @returns {Schema}
 */
Loader.prototype.load = function(schema, location) {
    var adapter = this.adapterFactory.createAdapter(schema);

    var schemaFile = typeof location === 'string' ? path.join(location, 'schema') : location.schemaFile;
    var modelsDir = location.modelsDir ? location.modelsDir : path.join(path.dirname(schemaFile), 'models');

    require(schemaFile)(adapter.schema, adapter.types);

    var models = modules.load(modelsDir);

    Object.keys(models).forEach(function(model) {
        var md = models[model];
        var foundModel = adapter.model(model);
        if (foundModel && (typeof md === 'function')) {
            md(adapter.schema, foundModel);
        }
    });
    return adapter.schema;

};