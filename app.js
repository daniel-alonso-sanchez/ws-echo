const express = require('express');
const app = express();

var winston = require('winston');
var xmlBeautifier=require('xml-beautifier');

function anyBodyParser(req, res, next) {
    var data = '';
    req.setEncoding('utf8');
    req.on('data', function(chunk) { 
        data += chunk;
    });
    req.on('end', function() {
        req.rawBody = data;
        next();
    });
}


app.use(anyBodyParser);

app.post('/', function(req, res){
	var contentType = req.headers['content-type'];
	var reqString;
	if (contentType && contentType.indexOf('application/xml') !== 0){
		reqString=xmlBeautifier(req.rawBody);
	}
	else{
		reqString=req.rawBody;
	}
	winston.info(reqString);
    
	res.status(200).send(req.body);    
});



app.listen(3000, function () {
   winston.info('Example app listening on port 3000!')
})