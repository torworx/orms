module.exports = exports = function(schema, Person) {
    Person.hasMany('companies', schema.models.Company, {}, { reverse: 'people' });
};