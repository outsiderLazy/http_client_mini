#!/usr/bin/env node

//引用httpclient模块
var httpClient = require('../index.js');
var queryString = require('querystring');

var server=require('./server.js');
server.start();

var _data0 = { name: 'Bill', age: '50' };
var _getParam = queryString.stringify(_data0);

//设置请求超时时间，默认为15秒
httpClient.setRequestTimeout(10000);

httpClient.get({
    url: 'http://localhost:8888?' + _getParam,
    successCallback: function(pdata) {
        console.log('data: ' + pdata+'\n');
    },
    failureCallback: function(e) {
        console.log('errno:' + e.errno + ',message:' + e.message);
    }
});

_data1={ name: 'Mike', age: '18' };
httpClient.post({
    url: 'http://localhost:8888',
    successCallback: function(pdata) {
        console.log('data:' + pdata+'\n');
    },
    failureCallback: function(e) {
        console.log('errno:' + e.errno + ',message:' + e.message);
    },
    data: _data1
});


