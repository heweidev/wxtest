
/*
appID
wx6015b569d0e07ec9
appsecret
d4624c36b6795d1d99dcf0547af5443d

https请求方式: GET
https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=APPID&secret=APPSECRET
*/

var https = require('https')

var TOKEN;


function getAccessToken() {
    if (TOKEN == null || TOKEN == undefined || TOKEN.len == 0) {
        refreshAccessToken('wx6015b569d0e07ec9', 'd4624c36b6795d1d99dcf0547af5443d')
        return null;
    } else {
        return TOKEN;
    }
}

function refreshAccessToken(appID, appsecret) {
    const url = 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=' + appID + '&secret=' + appsecret;
    console.log(url);

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
          try {
            const parsedData = JSON.parse(rawData);
            TOKEN = parsedData.access_token;

            console.log(parsedData);
          } catch (e) {
            console.log(e.message);
          }
        });
      }).on('error', (e) => {
        console.log(`Got error: ${e.message}`);
      });
}

module.exports = {
    get: getAccessToken,
    refresh: refreshAccessToken,
};
