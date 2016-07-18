
// ともかくあの表を作成する

const readline = require('readline');
const fs = require('fs');
const ColumnValue = require('./pandf').ColumnValue;

exports.create = function(wakuList, columnValueList) {
  var list = [wakuList];
  columnValueList.forEach(function(columnValue) {
    list.push(exports._createList(wakuList.length , columnValue));
  });
  return list;
}

exports._createList = function(num, columnValue) {
  var list = new Array(num);
  for (var i = 0; i < list.length; i++) {
    list[i] = '';
    if (columnValue.startIndex <= i && i <= columnValue.endIndex) {
      list[i] = columnValue.type;
    }
  }
  return list;
};
