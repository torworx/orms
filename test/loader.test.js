var persist = require('persist'),
    expect = require('expect.js'),
    Loader = require('../lib/loader');

describe('Loader', function() {

    function creatLoader() {
        return new Loader('persist');
    }

    it('load from dir string', function () {
        var loader = creatLoader();
        var schema = loader.load(null, __dirname + '/db'),
            Company = schema.model('Company'),
            Person = schema.model('Person');

        expect(Company).to.be.ok();
        expect(Person).to.be.ok();

        var people = Company.associations['people'];
        expect(people).to.be.ok();
        expect(people.type).to.be('hasMany');
        expect(people.through).to.be('CompanyPerson');

    });

    it('load from object', function () {
        var loader = creatLoader();
        var schema = loader.load(null,  __dirname + '/db/schema', __dirname + '/db/models'),
            Company = schema.model('Company'),
            Person = schema.model('Person');

        expect(Company).to.be.ok();
        expect(Person).to.be.ok();

        var people = Company.associations['people'];
        expect(people).to.be.ok();
        expect(people.type).to.be('hasMany');
        expect(people.through).to.be('CompanyPerson');

    });

    it('load from multi locations', function () {
        var loader = creatLoader();
        var schema = new (require('persist-schema').Schema)();
        loader.load(schema, __dirname + '/db');
        loader.load(schema, __dirname + '/db2');

        expect(schema.models.Company).to.be.ok();
        expect(schema.models.Person).to.be.ok();
        expect(schema.models.Phone).to.be.ok();
    });

});