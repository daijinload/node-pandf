var assert = require('power-assert');
var PandF = require('../pandf');

describe('（#^ω^）', function(){
  describe('枠リスト作成に必要な値を入れた場合', function(){
    it('枠リストが出来ること', function(){
      var list = PandF.prototype._createWakuList(10000, 10200, 50);
      // console.log(list);
      assert.deepStrictEqual(list, [ 10050, 10100, 10150, 10200 ]);
    });
  });
  describe('指定形式のファイルを読み込ませた場合', function(){
    it('加工も済んだ状態で、リストが返却されること', function(){
      PandF.prototype._readFile('chart_20160702134558.csv', function(err, list) {
        // console.log(list);
        assert.deepStrictEqual(list, [ 100000, 104000, 100000 ]);
      });
    });
  });
  describe('セットアップを実行した場合', function(){
    before(function() {
    });
    it('セットアップされること', function(){
      var options = {
        start: 10000,
        end: 10200,
        waku: 50,
        fileName: 'chart_20160702134558.csv'
      };
      var pandf = new PandF(options);
      pandf.setup(function() {
        assert.deepStrictEqual(pandf.wakuList, [ 10050, 10100, 10150, 10200 ]);
        assert.deepStrictEqual(pandf.valueList, [ 100000, 104000, 100000 ]);
        console.log(pandf);
      });
    });
  });
});

//   describe('枠が転換した場合', function(){
//     it('転換したことを示す何かが帰ってくること', function(){
//       var options = {
//         waku: 50,
//         fileName: 'chart_20160702134558.csv'
//       };
//       var _pandf = new PandF(options);
//       _pandf.culc(100);
//       _pandf.culc(250);
//       _pandf.culc(100);
// //      assert(!err);
//     });
