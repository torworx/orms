var Schema = require('jugglingdb').Schema;

exports.createAdapter = function (schema) {
    return new JugglingDB(schema);
};

function JugglingDB(schema) {
    this.__schema = schema;
    this.__types = {
        string: String,
        date: Date,
        number: Number,
        boolean: Boolean
    };
    for (var name in Schema.types) if (Schema.types.hasOwnProperty(name)) {
        this.__types[name] = Schema.types[name];
        this.__types[name.toLowerCase()] = Schema.types[name];
    }

    this.__models = {};

    for (var key in schema) if (schema.hasOwnProperty(key)) {
        this[key] = schema[key];
    }

    this.define = function (className, properties, settings) {
        var Model = this.__schema.define(className, properties, settings);
        this.__models[name] = Model;
        return Model;
    };
}

JugglingDB.prototype.model = function (model, caseSensitive) {
    if (!caseSensitive) {
        model = model.toLowerCase();
    }
    var models = this.__schema.models,
        foundModel;
    for (var i in models) if (models.hasOwnProperty(i)) {
        if (model === i || !caseSensitive && model === i.toLowerCase()) {
            foundModel = models[i];
        }
    }
    return foundModel;
};
