module.exports = exports = function(schema, t) {

    schema.define("Company", {
        "name": t.string
    });

    schema.define("Person", {
        "name": t.string,
        "age": t.number,
        "createdDate": { type: t.date },
        "lastUpdated": { type: t.date }
    });

    schema.define("CompanyPerson", {
        "companyId": t.number,
        "personId": t.number
    });
};