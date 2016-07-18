
var PandF = require('./pandf').PandF;
var output = require('./output');

var pandf = new PandF({
  fileName: __dirname + '/chart_20160702134558.csv',
  start: 100000,
  end: 105000,
  waku: 500
});
pandf.setup(function() {
  console.log('aaaaaaaaaaaa', pandf);


  var list = pandf.culc();
  var list2 = output.create(pandf.wakuList, list);
  console.log(list2);
});
