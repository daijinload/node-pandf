
// ともかくあの表を作成する

const readline = require('readline');
const fs = require('fs');
const ColumnValue = require('./pandf').ColumnValue;

exports.create = function(list) {
  return list;
}

exports._createList = function(num) {
  var list = new Array(num);
  for (var i = 0; i < list.length; i++) {
    list[i] = '';
  }
  return list;
};
