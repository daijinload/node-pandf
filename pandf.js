
// https://www.rakuten-sec.co.jp/MarketSpeedFX/onLineHelp/info/sp_chart/pf.html
// [1] ポイント・アンド・フィギュア（P&F）は、上昇を”×”、下落を”○”で表しています。
// 初期設定の値幅は10ですので10pipsの値動きで×(○)が描画されます。
// [2] 価格は終値を採用します。
// [3] それぞれの列は、上昇か下降かの一方のみが表示され、×印と○印は同じ列には記入しません。
// [4] 価格が方向転換(上昇→下降もしくは下降→上昇)した時は、右に一列移動して記入します。
//     そのため×印と○印は一列おきに表示されます。
// [5] ×印と○印は一列に必ず3つ以上記入します。つまり価格の方向転換には、価格水準に応じた
//     3枠以上(初期設定では30pips)の価格変動が必要です。これを3枠転換
//     （スリー・ポイント・リバーサル）と言います。なお上昇相場、下降相場とも列を変えて×印
//     または○印を記入する時は、1枠あけてから書き込むため、結局は4枠以上(初期設定では40pips)
//     の価格変動が列を変えるためには必要となります。ただし、同じ方向に動いている間は上昇、
//     下降とも1枠(初期設定では10pips)でも記入します。
// [6] 上昇時でも、下降時でも0.1pipに満たない端数は切り捨てます。

const readline = require('readline');
const fs = require('fs');

const TYPE_NONE = exports.TYPE_NONE　= '';
const TYPE_MARU = exports.TYPE_MARU= '○';
const TYPE_BATSU = exports.TYPE_BATSU= '×';


/**
　* 列計算用クラス
 */
function Column(waku, type, index) {
  this.waku = waku;
  this.type = type;
  this.initIndex = index;
  this.maxIndex = index;
  this.minIndex = index;
  this.isMaxChange = false;
  this.isMinChange = false;
}
exports.Column = Column;


/**
　* 枠計算
 */
Column.prototype.culc = function(index) {
  if (this.maxIndex < index) {
    this.maxIndex = index;
  }
  if (index < this.minIndex) {
    this.minIndex = index;
  }

  var isChange = false;
  if (this.initIndex + this.waku + 1 <= this.maxIndex) {
    this.isMaxChange = true;
  }
  if (this.minIndex <= this.initIndex - this.waku - 1) {
    this.isMinChange = true;
  }
  return this;
};

/**
　* 列計算用クラス
 */
function ColumnValue(type, startIndex, endIndex) {
  this.type = type;
  this.startIndex = startIndex;
  this.endIndex = endIndex;
}
exports.ColumnValue = ColumnValue;


/**
　* ポイントandフィギュアクラス
 */
function PandF(opsions) {
  this.fileName = opsions.fileName;
  this.start = opsions.start;
  this.end = opsions.end;
  this.waku = opsions.waku;
  this.wakuList = [];
  this.rateList = [];

  this.outList = [];
};
exports.PandF = PandF;


/**
　* ファイル読み込んだり、枠リスト作ったり
 */
PandF.prototype.setup = function(callback) {
  // あとで、入力のrateListから、最大値と最小値を取ってきたほうがよいかと
  var self = this;
  self.wakuList = PandF.prototype._createWakuList(this.start, this.end, this.waku);
  PandF.prototype._readFile(this.fileName, function(err, list) {
    self.rateList = list;
    callback(err);
  });
};

// メインの計算処理
PandF.prototype.culc = function(waku, wakuList, rateList) {

  const outList = PandF.prototype._culc(waku, wakuList, rateList);

  let list = [];
  outList.forEach(function(column) {
    if (column.isMaxChange) {
      list.push(new ColumnValue(TYPE_MARU, column.initIndex, column.maxIndex));
    }
    if (column.isMinChange) {
      list.push(new ColumnValue(TYPE_BATSU, column.initIndex, column.minIndex));
    }
  });

  return list;
};


/**
　* 引数から、PandFの計算を行う。結果を配列で返す。
 */
PandF.prototype._culc = function(waku, wakuList, rateList) {
  var outList = [];
  var column;
  rateList.forEach(function(num) {
    var index = PandF.prototype._getIndex(wakuList, num);
    if (!column) {
      column = new Column(waku, TYPE_NONE, index);
    }

    column.culc(index);

    if (column.isMaxChange) {
//      console.log(' isMaxChange before', value);
      column.type = TYPE_MARU;
      outList.push(column);
      column = new Column(waku, TYPE_BATSU, index);
//      console.log(' isMaxChange after', value);
    }
    if (column.isMinChange) {
//      console.log(' isMinChange before', value);
      column.type = TYPE_BATSU;
      outList.push(column);
      column = new Column(waku, TYPE_MARU, index);
//      console.log(' isMinChange after', value);
    }
  });

  outList.push(column);

  return outList;
}


/**
　* 枠リストから、対応するレンジのindexを取得する。
 */
PandF.prototype._getIndex = function(list, num) {
  for (var i = 0; i < list.length; i++) {
    if (list[i] <= num && num < list[i + 1]) {
      return i;
    }
  }
  // 枠リストは全数値チェックしてから作るので、基本ここにはこないはず。
  // 数値がメモリに入らずに、事前計算出来ない場合、来るとかかなぁ。
  throw new Error('枠リストの範囲外の数値が来ました。。。');
}


/**
　* 枠配列作成
 */
PandF.prototype._createWakuList = function(start, end, width) {
  let arr = [];
  let num = start;
  while (num < end) {
    num += width;
    arr.push(num);
  }
  return arr;
};


/**
　* ファイル読み込み＆加工（本当は１メソッド、１処理が良いのだが。。。）
 */
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
