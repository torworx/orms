module.exports = exports = function(schema, t) {

    schema.define("Company", {
        "name": t.STRING
    }, { table: 'company_' });

    schema.define("Person", {
        "name": t.STRING,
        "age": t.NUMBER,
        "createDate": { type: t.DATE },
        "lastUpdated": { type: t.DATE }
    }, { table: 'person_' });
};