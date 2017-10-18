var xml2js = require('xml2js');
var parseString = xml2js.parseString;
var xml = "<root>Hello xml2js!</root>"
parseString(xml, function (err, result) {
    

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