exports.createAdapter = function (db) {
    return new ORM(db);
};

function ORM(db) {
    this.schema = db;
    this.types = {
        string: 'text',
        text: 'text',
        number: 'number',
        boolean: 'boolean',
        date: 'date',
        object: 'object',
        buffer: 'binary',
        binary: 'binary',
        array: 'enum',
        enum: 'enum'
    };
}

ORM.prototype.model = function (model, caseSensitive) {
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