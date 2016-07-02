
// node node_modules/mocha/bin/mocha test/test.js
// node node_modules/mocha/bin/mocha --watch test/test.js

var util = require('util');
var assert = require('power-assert');
var output = require('../output');
var ColumnValue = require('../pandf').ColumnValue;

describe('⊂二二二（ ＾ω＾）二⊃', function() {
  describe('とりあえず、セットした場合', function() {
    it('ああああ出来ること', function() {
      var v = new ColumnValue();


      var list = [v];
      console.log(output.create(list));
      //assert.deepStrictEqual(list, [ 10050, 10100, 10150, 10200 ]);

      console.log(output._createList(20));
    });
  });
});
