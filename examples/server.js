//为了测试httpclient模块，这里创建一个本地httpserver
var http = require('http');
var queryString = require('querystring');
var util = require('util');
//开启http服务程序，监听8888端口，通过http://localhost:8888访问
exports.start = function() {
    console.log('httpServer start...');
    http.createServer(function(req, res) {
        if (req.method == 'GET') {
            var param = req.url.substr(req.url.indexOf('?') + 1);
            console.log('server接收到GET请求,data: ' + param);

            var get = queryString.parse(param);
            get.method = 'get';
            get.fromSever = true;
            res.end(util.inspect(get));
        } else if (req.method == 'POST') {
            var post = '';

            req.on('data', function(chunk) {
                post += chunk;
            });
            req.on('end', function() {
                console.log('server接收到POST请求,data: ' + post);
                post = queryString.parse(post);
                post.method = 'post';
                post.fromSever = true;
                res.end(util.inspect(post));
            });
        }
    }).listen(8888);
}
