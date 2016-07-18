
// node node_modules/mocha/bin/mocha test/test.js
// node node_modules/mocha/bin/mocha --watch test/test.js

var util = require('util');
var assert = require('power-assert');
var output = require('../output');
var ColumnValue = require('../pandf').ColumnValue;

describe('⊂二二二（ ＾ω＾）二⊃', function() {
  describe('とりあえず、セットした場合', function() {
    it('ああああ出来ること', function() {
      var wakuList = [ 100, 105, 110, 115, 120, 125, 130, 135, 140 ];
      var columnValueList = [
        new ColumnValue('○', 4, 6),
        new ColumnValue('×', 2, 5),
        new ColumnValue('○', 3, 7)
      ];

      // wakulist, [ColumnValue, ColumnValue, ColumnValue]
      var outList = [
        [ 100, 105, 110, 115, 120, 125, 130, 135, 140 ],
        [  '',  '',  '',  '', '○', '○', '○',  '',  '' ],
        [  '',  '', '×', '×', '×', '×',  '',  '',  '' ],
        [  '',  '',  '', '○', '○', '○', '○', '○',  '' ]
      ];

      var list = output.create(wakuList, columnValueList);

      assert.deepStrictEqual(list, outList);
    });
  });
});
