var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var xml = "<root>Hello xml2js!</root>"
var xml2 = "<xml><ToUserName><![CDATA[gh_39d65202d116]]></ToUserName>    \
<FromUserName><![CDATA[oeYOBuKASLyudgyVwjLovK39FI2A]]></FromUserName>   \
<CreateTime>1508315343</CreateTime>             \
<MsgType><![CDATA[text]]></MsgType>             \
<Content><![CDATA[本来就]]></Content>            \
<MsgId>6478165071003084079</MsgId>  \
</xml>";

parseString(xml2, function (err, result) {
    

    if (err) {
        console.log('failed');
    } else {
        console.dir(result);
    }
    
});

var obj = {name: "Super", Surname: "Man", age: 23};

var builder = new xml2js.Builder({
    rootName: 'test',
    xmldec:  {'version': '1.0', 'encoding': 'UTF-8'},
});
var xml = builder.buildObject(obj);
console.log(xml);