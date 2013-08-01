module.exports = exports = function(schema, t) {

    schema.define("Company", {
        "name": t.STRING
    });

    schema.define("Person", {
        "name": t.STRING,
        "age": t.INTEGER,
        "createdDate": { type: t.DATETIME },
        "lastUpdated": { type: t.DATETIME }
    });
};