var Schema = require('jugglingdb').Schema;

exports.createAdapter = function (schema) {
    return new JugglingDB(schema);
};

function JugglingDB(schema) {
    this.schema = schema;
    this.types = {
        string: String,
        date: Date,
        number: Number,
        boolean: Boolean
    };
    for (var name in Schema.types) {
        this.types[name] = Schema.types[name];
        this.types[name.toLowerCase()] = Schema.types[name];
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
