
// node node_modules/mocha/bin/mocha test/pandf.js
// node node_modules/mocha/bin/mocha --watch test/pandf.js

var util = require('util');
var assert = require('power-assert');
var PandF = require('../pandf').PandF;
var Column = require('../pandf').Column;

describe('（#^ω^）', function(){
  describe('枠リスト作成に必要な値を入れた場合', function(){
    it('枠リストが出来ること', function(){
      var list = PandF.prototype._createWakuList(10000, 10200, 50);
      // console.log(list);
      assert.deepStrictEqual(list, [ 10000, 10050, 10100, 10150, 10200 ]);
    });
  });
  describe('指定形式のファイルを読み込ませた場合', function(){
    it('加工も済んだ状態で、リストが返却されること', function(done){
      PandF.prototype._readFile(__dirname + '/chart_test.csv', function(err, list) {
        // console.log(list);
        assert.deepStrictEqual(list, [ 100000, 104000, 100000 ]);
        done(err);
      });
    });
  });
  describe('セットアップを実行した場合', function(){
    it('wakuListとrateListが、セットアップされること', function(done){
      var options = {
        start: 10000,
        end: 10200,
        waku: 50,
        fileName: 'chart_20160702134558.csv'
      };
      var pandf = new PandF(options);
      pandf.setup(function(err) {
        assert.deepStrictEqual(pandf.wakuList, [ 10000, 10050, 10100, 10150, 10200 ]);
        assert.deepStrictEqual(pandf.rateList, [ 100000, 104000, 100000 ]);
        done(err);
      });
    });
  });

  describe('枠計算処理を実行した場合', function(){
    it('対応する枠リストのindex値が返却されること', function(){
      var pandf = new PandF({});
      var wakuList = [ 1000, 1050, 1100, 1150, 1200 ];
      assert(PandF.prototype._getIndex(wakuList, 1000) === 0);
      assert(PandF.prototype._getIndex(wakuList, 1050) === 1);
      assert(PandF.prototype._getIndex(wakuList, 1199) === 3);
    });
  });

  describe('5が現在地で、下方向に列変更になる場合', function(){
    it('3枠だと下方向に4動くと変更なので、5-4で、1の場合にtrueを返すこと', function() {
      var column = new Column(3, '', 5);
      assert(column.culc(4).isMinChange === false);
      assert(column.culc(3).isMinChange === false);
      assert(column.culc(2).isMinChange === false);
      assert(column.culc(1).isMinChange === true);
    });
  });

  describe('5が現在地で、上方向に列変更になる場合', function(){
    it('3枠だと上方向に4動くと変更なので、5+4で、9の場合にtrueを返すこと', function() {
      var column = new Column(3, '', 5);
      assert(column.culc(6).isMaxChange === false);
      assert(column.culc(7).isMaxChange === false);
      assert(column.culc(8).isMaxChange === false);
      assert(column.culc(9).isMaxChange === true);
    });
  });

  describe('枠計算用処理に２回転換するデータを渡した場合', function(){
    it('２回転換して結果を配列で返すこと', function() {
      var pandf = new PandF({});
      var wakuList = [ 1000, 1050, 1100, 1150, 1200, 1250 ];
      var rateList = [ 1200, 1000, 1200 ];
      var outList = pandf._culc(3, wakuList, rateList);
      // console.log(outList);
      assert(outList[0].isMinChange === true);
      assert(outList[1].isMaxChange === true);
      assert(outList[2].isMinChange === false);
      assert(outList[2].isMaxChange === false);
      assert(outList.length === 3);
    });
  });
});
