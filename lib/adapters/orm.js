exports.createAdapter = function (db) {
    return new ORM(db);
};

function ORM(schema) {
    this.__schema = schema;
    this.__types = {
        STRING: 'text',
        TEXT: 'text',
        NUMBER: 'number',
        BOOLEAN: 'boolean',
        DATE: 'date',
        OBJECT: 'object',
        BUFFER: 'binary',
        BINARY: 'binary',
        ARRAY: 'enum',
        ENUM: 'enum'
    };
    this.__models = {};

    for (var key in schema) if (schema.hasOwnProperty(key)) {
        this[key] = schema[key];
    }

    this.define = function (name, properties, opts) {
        var Model = this.__schema.define(name, properties, opts);
        this.__models[name] = Model;
        return Model;
    };
}

ORM.prototype.model = function (model, caseSensitive) {
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