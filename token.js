
/*
appID
wx6015b569d0e07ec9
appsecret
d4624c36b6795d1d99dcf0547af5443d

https请求方式: GET
https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
*/

var https = require('https')
//var http = require('http')

var TOKEN;

var appID = 'wx6015b569d0e07ec9'
var appsecret = 'd4624c36b6795d1d99dcf0547af5443d'


function getAccessToken() {
    if (TOKEN == null || TOKEN == undefined || TOKEN.len == 0) {
        refreshAccessToken(appID, appsecret)
        return null;
    } else {
        return TOKEN;
    }
}

function refreshAccessToken(appID, appsecret) {
    const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appID + '&secret=' + appsecret;
    console.log(url);

    https_get(url, function(rawData){
        try {
            const parsedData = JSON.parse(rawData);
            TOKEN = parsedData.access_token;

            console.log(TOKEN);
          } catch (e) {
            console.log(e.message);
          }
    });
}

function getInfo(code, callback) {
    // https://api.weixin.qq.com/sns/oauth2/access_token?appid=APPID&secret=SECRET&code=CODE&grant_type=authorization_code 
    const url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=' + appID + '&secret=' + appsecret + '&code=' + code + '&grant_type=authorization_code';
    console.log(`getInfo code = ${code}`);

    https_get(url, function(rawData){
        try {
            const parsedData = JSON.parse(rawData);
            console.log('access_token = ' + parsedData.access_token + ', rawData = ' + rawData);

            if (parsedData.access_token) {
                console.log('access_token = ' + parsedData.access_token);
                // https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN 
                var url = 'https://api.weixin.qq.com/sns/userinfo?access_token=' + parsedData.access_token +
                '&openid=' + parsedData.openid + '&lang=zh_CN';
                https_get(url, callback);
            } else {
		console.log('no token');
                callback(rawData);
            }
          } catch (e) {
            console.log(e.message);
          }
    });
}

function https_get(url, callback) {
console.log('https_get ' + url);    
https.get(url, function (res) {
        const statusCode = res.statusCode;
        const contentType = res.headers['content-type'];
      
        var error;
        if (statusCode !== 200) {
          // error = new Error('Request Failed.\n' +
          //                  `Status Code: ${statusCode}`);
        } else if (!/^application\/json/.test(contentType)) {
          // error = new Error('Invalid content-type.\n' +
          //                  `Expected application/json but received ${contentType}`);
        }
        if (error) {
          console.log(error.message);
          // consume response data to free up memory
          res.resume();
          return;
        }
      
        res.setEncoding('utf8');
        var rawData = '';
        res.on('data', (chunk) => rawData += chunk);
        res.on('end', () => {
            callback(rawData);
        });
      }).on('error', (e) => {
        console.log(`Got error: ${e.message}`);
      });
}

// https://api.weixin.qq.com/sns/userinfo?access_token=ACCESS_TOKEN&openid=OPENID&lang=zh_CN 

module.exports = {
    getInfo: getInfo,
    get: getAccessToken,
    refresh: refreshAccessToken,
};
