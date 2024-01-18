const fs = require('fs');
const express = require('express');
const app = express()
const port = 3000

app.use(express.static('static'));

app.get('/', (req, res)=>{
	const url = req.url;
	res.writeHead(200, {'Content-Type': 'text/html'});

	//Script na GET. data ulozena v promenne prozatim v plain textu bez parsu
	if (url.split("?").length > 1){
		getdata = req.url.split("?");
		console.log(getdata);
	};
	// Basic nacteni html
	site_code = fs.readFileSync('index.html').toString()
	// Nacteni sablony quest1
	// Staci zkopirovat pod a nastavit svuj soubor sablony a text k nahrazeni
	site_code = site_code.replace("#1000#", fs.readFileSync("./templates/quest1.html").toString())
	//Pridani sablony pictureDef
	site_code = site_code.replace("#4000#", fs.readFileSync("./templates/pictureDef.html").toString())
        


	// Odeslani cele promene do resultu
	res.write(site_code); 
	res.end(); 
})

app.get('/about', (req, res)=>{
	const url = req.url;
	//about lulw, kdo píše jak master tak sem může něco napsat :D
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.write(' Welcome to about us page'); 
	res.end(); 
})

app.get('/quiz', (req, res)=>{
	//QUIZ
	const url = req.url;
	res.writeHead(200, {'Content-Type': 'text/html'});
    res.write(' Welcome to quiz select page'); 
	res.end();
})

/*app.get('/pictureDefinition', (req, res)=>{
	//pictureDefinition html
	const url = req.url;
	res.writeHead(200, {'Content-Type': 'text/html'});
	temp = (fs.readFileSync('index.html').toString()) //načte se index template
	res.write(temp.replace("#template#", fs.readFileSync('./templates/pictureDef.html').toString())) //v těle indexu se replacne html body z PictureDef.html
	res.end(); 
})*/

app.get('/favicon.ico', (req, res)=>{
	const url = req.url;
	res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(fs.readFileSync('favicon.ico'));
    res.end()
})


app.listen(port, () => console.log(`server start at port http://127.0.0.1:${port}/`));







