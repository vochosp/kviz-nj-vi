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
	// Staci zkopirovat pod a nastavit svuj soubor sablony a text k nahrazeni a idcka otazek
	site_code = set_side_code(site_code, 1000, "./templates/quest1.html" )
	

	
	//Pridani sablony pictureDef
	site_code = set_side_code(site_code, 4000, "./templates/pictureDef.html")
	
	//Pridani dalsi sablony drag and drop definice
	site_code = set_side_code(site_code, 5000, "./templates/dragdef.html")
        

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

app.get('/favicon.ico', (req, res)=>{
	const url = req.url;
	res.writeHead(200, {'Content-Type': 'text/css'});
    res.write(fs.readFileSync('favicon.ico'));
    res.end()
})


app.listen(port, () => console.log(`server start at port http://127.0.0.1:${port}/`));





// funkce pro nacteni sablony quest1
function set_side_code(site_code, dataset_code, template_html){
	site_code = site_code.replace(`#${dataset_code.toString()}#`, fs.readFileSync(template_html).toString().replace('#DATA#', () => {
		for (const key in final_data) {
			if (key === dataset_code.toString()){
				return final_data[key]
			}
		}
	}))
	return site_code
}



