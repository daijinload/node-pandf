
const readline = require('readline');
const fs = require('fs');

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
  const rl = readline.createInterface({
    input: fs.createReadStream(fileName)
  });
  var list = [];
  rl.on('line', (line) => {
    let arr = line.split('"');
    list.push(Number(arr[arr.length - 2].replace('.', '')));
  }).on('close', () => {
    callback(null, list.reverse());
  });
};

// こいつが本体さ
exports.PandF = function PandF(options, callback) {
  this.current = 0;
  this.status = '';
  this.cell = 0;
  this.culc = function(num) {
    console.log(num);
  };
};

exports.culc = function(options, callback) {
  exports.readFile(options.fileName, function(err, list) {
    var pandf = new exports.PandF();
    list.forEach(function(value) {
      pandf.culc(value);
    });
  });
};
