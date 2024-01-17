const http = require('http');
const fs = require('fs');


// Create a server object
http.createServer(function (req, res) {
	
	// http header 
	const url = req.url;

	if(url ==='/about') {
		//about lulw, kdo píše jak master tak sem může něco napsat :D
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(' Welcome to about us page'); 
		res.end(); 
	}
	else if(url ==='/quiz') {
		//QUIZ
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write(' Welcome to quiz select page'); 
		res.end();
	}
    else if(url === '/style.css') {
        //CSS connect
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(fs.readFileSync('style.css').toString());
        res.end()
    }
	else if(url === '/favicon.ico') {
        //Favicon ico
        res.writeHead(200, {'Content-Type': 'text/css'});
        res.write(fs.readFileSync('favicon.ico'));
        res.end()
    }
	else if(url === '/main.js') {
        //main sript js
        res.writeHead(200, {'Content-Type': 'text/javaScript'});
        res.write(fs.readFileSync('main.js').toString());
        res.end()
    }
	else if(url === '/pictureDefinition'){
		//pictureDefinition html
		res.writeHead(200, {'Content-Type': 'text/html'});
		temp = (fs.readFileSync('index.html').toString()) //načte se index template
        res.write(temp.replace("#template#", fs.readFileSync('./templates/pictureDef.html').toString())) //v těle indexu se replacne html body z PictureDef.html
		res.end(); 
	}
	else {
		//HOMEPAGE
        res.writeHead(200, {'Content-Type': 'text/html'});

		//Script na GET. data ulozena v promenne prozatim v plain textu bez parsu
		if (url.split("?").length > 1){
			getdata = req.url.split("?");
			console.log(getdata);
		};
		// Basic nacteni html
		index = fs.readFileSync('index.html').toString()
		site_code = index.replace("#template#", fs.readFileSync('./templates/test.html').toString())
		// Nacteni sablony quest1
		// Staci zkopirovat pod a nastavit svuj soubor sablony a text k nahrazeni
		site_code = site_code.replace("#1000#", fs.readFileSync("./templates/quest1.html").toString())
		//Pridani sablony pictureDef
		site_code = site_code.replace("#4000#", fs.readFileSync("./templates/pictureDef.html").toString())
        


		// Odeslani cele promene do resultu
		res.write(site_code); 
		res.end(); 
	}
}).listen(3000, function() {
	
	// The server object listens on port 3000
	console.log("server start at port http://127.0.0.1:3000/");
});


