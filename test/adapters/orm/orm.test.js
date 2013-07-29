var async = require('async'),
    orm = require('orm'),
    expect = require('expect.js'),
    orms = require('../../../');

describe('ORM', function () {

    function dropSync(models, done) {
        if (!Array.isArray(models)) {
            models = [models];
        }

        async.eachSeries(models, function (item, cb) {
            item.drop(function (err) {
                if (err) throw err

                item.sync(cb);
            });
        }, done);
    }

    it('load schema', function (done) {
        orm.connect({ database: ':memory:', protocol: 'sqlite', query: {debug: true}}, function (err, db) {
            orms.load('orm', db, __dirname + '/db');
            dropSync([db.models.Company, db.models.Person], function() {
                expect(db.models.Company).to.be.ok();
                expect(db.models.Person).to.be.ok();
                done();
            });
        });
    });

});