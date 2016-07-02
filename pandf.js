
const readline = require('readline');
const fs = require('fs');

// this.status = '';
// this.cell = 0;
// this.isChange = false;
// this.reset = function() {
// };

const TYPE_NONE = '';
const TYPE_MARU = '○';
const TYPE_BATSU = '×';

function V() {
  this.prev = 0;
  this.isChange = false;
  this.type = '';
}

function PandF(opsions) {
  this.fileName = opsions.fileName;
  this.start = opsions.start;
  this.end = opsions.end;
  this.waku = opsions.waku;
  this.wakuList = [];
  this.valueList = [];

  this.outList = [];
};
module.exports = PandF;

// ファイル読み込んだり、枠リスト作ったり
PandF.prototype.setup = function(callback) {
  // あとで、入力のvalueListから、最大値と最小値を取ってきたほうがよいかと
  var self = this;
  self.wakuList = PandF.prototype._createWakuList(this.start, this.end, this.waku);
  PandF.prototype._readFile(this.fileName, function(err, list) {
    self.valueList = list;
    callback(err);
  });
};

PandF.prototype.culc = function(list, num) {
  if (this.outList.length === 0) {
    this.outList.push(new V());
  }
  var value = this.outList[this.outList.length - 1];

  if (value.type === TYPE_NONE) {

  }
  if (value.type === TYPE_MARU) {

  }
  if (value.type === TYPE_BATSU) {

  }

  return value;
};

// 実際の計算処理
PandF.prototype._culc = function(list, num) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] <= num && num < list[i + 1]) {
      return i;
    }
  }
  // 枠リストは全数値チェックしてから作るので、基本ここにはこないはず。
  // 数値がメモリに入らずに、事前計算出来ない場合、来るとかかなぁ。
  throw new Error('枠リストの範囲外の数値が来ました。。。');
}


// PandF.prototype.culc = function(num) {
//   }
//   var value = this.outList[this.outList.length - 1];
//
//   console.log(this);
//   return this;
// };


// 枠配列作成
PandF.prototype._createWakuList = function(start, end, width) {
  let arr = [];
  let num = start;
  while (num < end) {
    num += width;
    arr.push(num);
  }
  return arr;
};

// ファイル読み込み＆加工（本当は１メソッド、１処理だぞ！！）
PandF.prototype._readFile = function(fileName, callback) {
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


// PandF.prototype.isWakeChange = function(num) {
//   return this.isChange;
// };

// exports.culc = function(options, callback) {
//   exports.readFile(options.fileName, function(err, list) {
//     var pandf = new exports.PandF();
//     list.forEach(function(value) {
//       pandf.culc(value);
//     });
//   });
// };
