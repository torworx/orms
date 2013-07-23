var persist = require('persist'),
    expect = require('expect.js'),
    Schema = require('jugglingdb').Schema,
    orms = require('../../../');

describe('JugglingDB', function() {

    var loader = orms.loader('jugglingdb');

    it('load', function () {
        var schema = new Schema('memory');
        loader.load(schema, __dirname + '/db');

        expect(schema.models.Company).to.be.ok();
        expect(schema.models.Person).to.be.ok();

    });

});