module.exports = exports = function(schema, Person) {
    var Company = schema.models.Company;
    Person.hasMany(Company, { through: 'CompanyPerson' });
};