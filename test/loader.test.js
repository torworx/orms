var persist = require('persist'),
    Schema = require('persist-schema').Schema,
    expect = require('expect.js'),
    Loader = require('../lib/loader');

describe('Loader', function() {

    function creatLoader() {
        return new Loader('persist');
    }

    it('load from dir string', function () {
        var loader = creatLoader();
        var schema = new Schema();
        loader.load(schema, __dirname + '/db');

        var Company = schema.model('Company'),
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
        var schema = new Schema();
        loader.load(schema,  __dirname + '/db/schema', __dirname + '/db/models');
        var Company = schema.model('Company'),
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
        var schema = new Schema();
        loader.load(schema, __dirname + '/db');
        loader.load(schema, __dirname + '/db2');

        expect(schema.models.Company).to.be.ok();
        expect(schema.models.Person).to.be.ok();
        expect(schema.models.Phone).to.be.ok();
    });

});