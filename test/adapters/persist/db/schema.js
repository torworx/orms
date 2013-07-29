module.exports = exports = function(schema, t) {

    schema.define("Company", {
        "name": t.string
    });

    schema.define("Person", {
        "name": t.string,
        "age": t.integer,
        "createdDate": { type: t.datetime },
        "lastUpdated": { type: t.datetime }
    });
};