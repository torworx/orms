exports.createAdapter = function (schema) {
    if (!schema) {
        var Schema = require('persist-schema').Schema;
        schema = new Schema();
    }
    return new Persist(schema);
};

function Persist(schema) {
    this.schema = schema;
    this.types = schema.types;
    for (var name in this.types) {
        this.types[name.toLowerCase()] = this.types[name];
    }
}

Persist.prototype.model = function (model, caseSensitive) {
    return this.schema.model(model, caseSensitive);
};
