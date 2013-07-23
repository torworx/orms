var Schema = require('jugglingdb').Schema;

exports.createAdapter = function (schema) {
    return new JugglingDB(schema);
};

function JugglingDB(schema) {
    this.schema = schema;
    this.types = {
        STRING: String,
        DATE: Date,
        NUMBER: Number,
        BOOLEAN: Boolean
    };
    for (var name in Schema.types) {
        this.types[name] = Schema.types[name];
        this.types[name.toUpperCase()] = Schema.types[name];
    }
}

JugglingDB.prototype.model = function (model, caseSensitive) {
    if (!caseSensitive) {
        model = model.toLowerCase();
    }
    var models = this.schema.models,
        foundModel;
    for (var i in models) {
        if (model === i || !caseSensitive && model === i.toLowerCase()) {
            foundModel = models[i];
        }
    }
    return foundModel;
};
