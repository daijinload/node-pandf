
// ファイル読み込み
// ファイル出力

// 枠配列作成
exports.createWakuList = function(start, end, width) {
  let arr = [];
  let num = start;
  while (num < end) {
    num += width;
    arr.push(num);
  }
  return arr;
};

// ファイル読み込み＆加工（本当は１メソッド、１処理だぞ！！）
exports.readFile = function(fileName, callback) {
  const readline = require('readline');
  const fs = require('fs');

  const rl = readline.createInterface({
    input: fs.createReadStream(fileName)
  });

  var list = [];
  rl.on('line', (line) => {
    let arr = line.split('"');
    list.push(Number(arr[arr.length - 2].replace('.', '')));
  }).on('close', () => {
    console.log('Have a great day!');
    callback(null, list.reverse());
  });
};

exports.PandF = function PandF(options, callback) {
  this.current = 0;
  this.status = '';
  this.cell = 0;
  this.culc = function(num) {
    console.log(num);
  };
};

exports.culc = function(options, callback) {
  readFile('chart_20160702134558.csv', function(err, list) {
    var pandf = new PandF();
    list.forEach(function(value) {
      pandf.culc(value);
    });
  });
};
