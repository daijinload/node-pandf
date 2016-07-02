var assert = require('power-assert');
var pandf = require('../pandf');

describe('（#^ω^）', function(){
  it('(ﾟ∀ﾟ)', function(){
    let wakuList = pandf.createWakuList(10000, 11000, 50);
    var options = {
      fileName: 'chart_20160702134558.csv'
    };
    pandf.culc(options, function(err, result) {
      assert(!err);
    });
  });
});
