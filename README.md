# http_client_mini
一个最简单的http客户端，支持get和post方法

## 安装
```
npm install http_client_mini [-g|--save|--save-dev|...]
```

## 引用
```
var httpClient = require('http_client_mini');
```

## API
### get
* `httpClient.get(obj)`
	* `obj <Object>` - `get`方法参数，`JSON`对象
		* `url <String>` - `get`请求`url`		
		* `successCallback <Callback>` - `get`请求成功回调
		* `failureCallback <Callback>` - `get`请求失败回调 

```
//例子：
httpClient.get({
    url: 'http://localhost:8888?name=outsider',
    successCallback: function(pdata) {
        console.log('data: ' + pdata+'\n');
    },
    failureCallback: function(e) {
        console.log('errno:' + e.errno + ',message:' + e.message);
    }
});
```
### post

* `httpClient.post(obj)`
	* `obj <Object>` - `post`方法参数，`JSON`对象
		* `url <String>` - `post`请求`url`		
		* `successCallback <Callback>` - `post`请求成功回调
		* `failureCallback <Callback>` - `post`请求失败回调
		* `data <Object>` - 通过`post`方式传输的数据，`JSON`对象

```
//例子：		
httpClient.post({
    url: 'http://localhost:8888',
    successCallback: function(pdata) {
        console.log('data:' + pdata+'\n');
    },
    failureCallback: function(e) {
        console.log('errno:' + e.errno + ',message:' + e.message);
    },
    data: {name:'outsider'}
});
```	

### setRequestTimeout
* httpClient.setRequestTimeout(ms)
	* ms <Integer> - 请求超时时间，单位毫秒，默认值15000.

