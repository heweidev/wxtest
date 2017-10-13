var express = require('express');
var app = express();
var crypto = require('crypto');

var TOKEN = 'YyuqcgOCMCtPrUtF';


app.get('/', function (req, res) {
  res.send('Hello World!');
});

function sha1(str) {
  var sha1 = crypto.createHash("sha1");//定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
  sha1.update(str);
  var res = sha1.digest("hex");  //加密后的值d
  return res;
}

function signature_handler(req, res, next) {
  var q = req.query;
  var token = TOKEN;
  var signature = q.signature; //微信加密签名  
  var nonce = q.nonce; //随机数  
  var timestamp = q.timestamp; //时间戳  
  var echostr = q.echostr; //随机字符串  
  /* 
      1）将token、timestamp、nonce三个参数进行字典序排序 
      2）将三个参数字符串拼接成一个字符串进行sha1加密 
      3）开发者获得加密后的字符串可与signature对比，标识该请求来源于微信 
  */
  var str = [token, timestamp, nonce].sort().join('');
  console.log(str);

  var sha = sha1(str);
  if (req.method == 'GET') {
    if (sha == signature) {
      res.send(echostr + '')
    } else {
      res.send('err');
    }
  } else if (req.method == 'POST') {
    if (sha != signature) {
      return;
    }
    next();
  }
}

app.use(signature_handler);

var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});