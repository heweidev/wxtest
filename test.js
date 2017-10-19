var token = require('./token')
token.refresh('wx6015b569d0e07ec9', 'd4624c36b6795d1d99dcf0547af5443d')


/*
const https = require('https');

https.get('https://www.baidu.com/', (res) => {
  console.log('statusCode:', res.statusCode);
  console.log('headers:', res.headers);

  res.on('data', (d) => {
    process.stdout.write(d);
  });

}).on('error', (e) => {
  console.error(e);
});
*/