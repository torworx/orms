exports.createAdapter = function (schema) {
    return new Persist(schema);
};

function Persist(schema) {
    this.__schema = schema;
    this.__types = schema.types;
    for (var name in schema.types) if (schema.types.hasOwnProperty(name)) {
        this.__types[name.toUpperCase()] = this.__types[name];
    }

    this.__models = {};

    for (var key in schema) if (schema.hasOwnProperty(key)) {
        this[key] = schema[key];
    }

    this.define = function (name, columnDefs, opts) {
        var Model = this.__schema.define(name, columnDefs, opts);
        this.__models[name] = Model;
        return Model;
    };
}

Persist.prototype.model = function (model, caseSensitive) {
    return this.__schema.model(model, caseSensitive);
};
