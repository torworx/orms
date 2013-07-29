module.exports = exports = function(schema, t) {

    schema.define("Company", {
        "name": t.string
    }, { table: 'company_' });

    schema.define("Person", {
        "name": t.string,
        "age": t.number,
        "createDate": { type: t.date },
        "lastUpdated": { type: t.date }
    }, { table: 'person_' });
};