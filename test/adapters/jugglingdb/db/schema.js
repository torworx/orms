module.exports = exports = function(schema, t) {

    schema.define("Company", {
        "name": t.STRING
    });

    schema.define("Person", {
        "name": t.STRING,
        "age": t.NUMBER,
        "createdDate": { type: t.DATE },
        "lastUpdated": { type: t.DATE }
    });

    schema.define("CompanyPerson", {
        "companyId": t.NUMBER,
        "personId": t.NUMBER
    });
};