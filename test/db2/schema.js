module.exports = exports = function(schema, t) {

    schema.define("Phone", {
        "number": { type: t.STRING }
    });

};