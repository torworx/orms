var persist = require('persist'),
    expect = require('expect.js'),
    orms = require('../../../');

describe('Persist', function() {

    var loader = orms.loader('persist');

    it('load', function () {
        var schema = loader.load(null, __dirname + '/db');

        expect(schema.models.Company).to.be.ok();
        expect(schema.models.Person).to.be.ok();

        var people = schema.models.Company.associations['people'];
        expect(people).to.be.ok();
        expect(people.type).to.be('hasMany');
        expect(people.through).to.be('CompanyPerson');
    });

});