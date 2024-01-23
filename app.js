const fs = require('fs');
const express = require('express');
const app = express()
const port = 3000

app.use(express.static('static'));

app.get('/', (req, res)=>{

	/* format pokazde je to oddeleny znackou pro novou radku \n
	final_data = {
		'4000': '4000; bobfahren\r\n4001; eishockey\r\n' 
	}
	*/

	file_names = fs.readdirSync('data')
	final_data = {}
	file_names.forEach(x => {
	data = fs.readFileSync(`./data/${x}`).toString()
	// tahle ta sracka ti umozni ziskat otazky pro ruzne skupiny pr 1000
	// prida otazky do skupiny podle idcka, takze jedno ma treva klic 1000
		if(`${data.slice(0,1)}000` in final_data){
			final_data[`${data.slice(0,1)}000`] += data
		}else{
			final_data[`${data.slice(0,1)}000`] = data
		}
	});


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
	site_code = site_code.replace("#1000#", fs.readFileSync("./templates/quest1.html").toString().replace('#DATA#', () => {
		for (const key in final_data) {
			if (key === '1000'){
				return final_data[key]
			}
		}
	}))
	//Pridani sablony pictureDef
	site_code = site_code.replace("#4000#", fs.readFileSync("./templates/pictureDef.html").toString().replace('#DATA#', () => {
		for (const key in final_data) {
			if (key === '4000'){
				return final_data[key]
			}
		}
	}))
        


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







