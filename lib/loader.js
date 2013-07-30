var modules = require('./modules');
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
            console.log('\nWARNING: Models adapter "' + name + '" is not installed,\nso your models would not work, to fix run:\n\n    npm install orms-' + name, '\n');
        }
    }
}
/**
 * load schema from schema.js and models folder to 'schema'.
 *
 * @param schema Schema object
 * @param schemaModule schema definition module
 * @param modelsDir models post definition dir
 * @returns {*|Function|Schema}
 */
Loader.prototype.load = function(schema, schemaModule, modelsDir) {
    var resolvedSchemaModule = schemaModule,
        resolvedModelsDir = modelsDir;

    if (existsSync(schemaModule + '.js')) {

    } else if (existsSync(path.join(schemaModule, 'schema.js'))) {
        resolvedSchemaModule = path.join(schemaModule, 'schema');
    } else {
        throw new Error('No schema file found in "' + schemaModule +'"');
    }

    if (modelsDir === undefined) {
        resolvedModelsDir = path.join(path.dirname(resolvedSchemaModule), 'models');
    }

    var adapter = this.adapterFactory.createAdapter(schema);

    require(resolvedSchemaModule)(adapter, adapter.__types);

    if (resolvedModelsDir) {
        var models = modules.load(resolvedModelsDir);

        Object.keys(models).forEach(function(model) {
            var md = models[model];
            var foundModel = adapter.model(model);
            if (foundModel && (typeof md === 'function')) {
                md(adapter, foundModel);
            }
        });
    }
    return adapter.__models;

};