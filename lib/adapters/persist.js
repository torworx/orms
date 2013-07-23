exports.createAdapter = function (schema) {
    return new Persist(schema || new (require('persist-schema').Schema)());
};

function Persist(schema) {
    this.schema = schema;
    this.types = schema.types;
}

Persist.prototype.model = function (model, caseSensitive) {
    return this.schema.model(model, caseSensitive);
};
