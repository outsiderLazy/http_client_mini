/**
 * 基于nodejs v6.5.0
 * @author 陈焕雄
 * @file httpRequest.js
 */

/**
 * @typedef {object} JSON
 * @typedef {Function} callback
 */

/**
 * HttpClient——用于http请求，目前只对外暴露get和post方法
 */
function HttpClient() {
    var http = require('http');
    var URL = require('url');
    var queryString = require('querystring');
    self = this;
    //默认15秒超时
    self.requestTimeout = 15000;
    var request = function(pmethod, pargs) {
        var url = URL.parse(pargs.url);
        var postData = '';
        if (pargs.data)
            postData = queryString.stringify(pargs.data)
        var lOptions = {
            protocol: url.protocol || 'http:',
            hostname: url.hostname || 'localhost',
            port: url.port || 80,
            path: url.path || '/',
            method: pmethod || 'GET',
            timeout: self.requestTimeout,
        }
        if (pmethod == 'POST')
            lOptions.headers = { //对于post方法，这一段不能省
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': Buffer.byteLength(postData)
            }
            // console.log(JSON.stringify(lOptions));
        var req = http.request(lOptions, (pres) => {
            var statusCode = pres.statusCode;
            var contentType = pres.headers['content-type'];

            pres.setEncoding('utf8');
            var rawData = '';
            pres.on('data', (chunk) => rawData += chunk);

            pres.on('end', () => {
                if (pargs.successCallback)
                    pargs.successCallback(rawData);
            });


            var error;
            if (statusCode !== 200) {
                error = new Error(`Request Failed.\n` +
                    `Status Code: ${statusCode}`);
            }
            if (error) {
                if (pargs.failureCallback)
                    pargs.failureCallback({ errno: statusCode, message: error.message });
                console.log(error.message);
                // consume response data to free up memory
                pres.resume();
                return;
            }
        });
        req.on('error', (e) => {
            console.log(`problem with request: ${e.message}`);
        });
        if (pmethod == 'POST' && pargs.data) {
            try {
                // console.log('post的数据=' + postData);
                req.write(postData);
            } catch (e) {
                throw new Error(`post传递的数据必须是JSON对象，你传的是${pargs.data}`);
            }
        }
        req.end();
    };

    this.setRequestTimeout = function(pTimeout) {
        self.requestTimeout = pTimeout;
    }

    /**
     * 通过get方式请求
     * @Function get
     * @param {Object} pargs - get方法请求的参数，一个Object对象
     * @param {String} pargs.url - get请求的url
     * @param {Callback} pargs.successCallback 请求成功回调,回调参数是String类型
     * @param {Callback} pargs.failureCallback 请求失败回调,回调参数是一个JSON对象
     * @tutorial [link]
     */
    this.get = function(pargs) {
        if (!pargs.url)
            throw new Error('the param \"url\"must be passed！');
        request('GET', pargs);
    };

    /**
     * 通过post方式请求
     * @Function post
     * @param {Object} pargs - post请求的参数
     * @param {String} pargs.url - post请求的url
     * @param {Callback} pargs.successCallback 请求成功回调,回调参数是String类型
     * @param {Callback} pargs.failureCallback 请求失败回调,回调参数是一个JSON对象
     * @param {JSON} pargs.data - 通过post方式传输的数据
     */
    this.post = function(pargs) {
        if (!pargs.url)
            throw new Error('the param \"url\"must be passed！');
        request('POST', pargs);
    }
}

module.exports = new HttpClient();
