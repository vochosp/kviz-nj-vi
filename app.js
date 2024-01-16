const http = require('http');
const fs = require('fs');

// Create a server object
http.createServer(function (req, res) {
	
	// http header
	res.writeHead(200, {'Content-Type': 'text/html'}); 
	
	const url = req.url;
	
	if(url ==='/about') {
		//about lulw, kdo píše jak master tak sem může něco napsat :D
        res.write(' Welcome to about us page'); 
		res.end(); 
	}
	else if(url ==='/quiz') {
		//QUIZ
        res.write(' Welcome to quiz select page'); 
		res.end();
	}
    else if(url === '/style.css') {
        //CSS connect
        res.write(fs.readFileSync('style.css').toString());
        res.end()
    }
	else {
		//HOMEPAGE
        res.write('Hello World!'); 
		res.end(); 
	}
}).listen(3000, function() {
	
	// The server object listens on port 3000
	console.log("server start at port http://127.0.0.1:3000/");
});


