module.exports = exports = function(schema, Person) {
    Person.hasAndBelongsToMany('companies', { through: schema.models.CompanyPerson });
};