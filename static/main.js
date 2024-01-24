const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

function toggle_div(divid){
    var x = document.getElementById(divid);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
         x.style.display = "none";
    }
};

const templateId = urlParams.get('id') //získá tisícový id hry z URL
//console.log(templateId[0])

/*simply udělá list divů podle classy, kterou jsem jim přidělil (templateDiv)
a pokud se idčko divu nerovná idčku templatu z url, je jeho style.display nastavený na none - nevypisuje se
*/

function display_specific(divId){   
    const templatesIdslist = document.getElementsByClassName(divId); //je to class, ne id
    for (let i = 0; i<templatesIdslist.length; i++){
        if (templatesIdslist[i].id[0] === templateId[0]){
            templatesIdslist[i].style.display = "block"
        } else{
            templatesIdslist[i].style.display = "none"
        }
    }
    };

function reply_click(clicked_id){
    /*
        Alert potom get predani id do url
    */
    /*alert("ID tlacitka je: "+clicked_id); */
    /* pridano ID otazky */
    location.href = '../?quizid='+clicked_id+'&id='+clicked_id+'000'; /*Přidal jsem jednoduše, aby se určoval tisícový řád podle id */
    
    
};

/*
    recyklace getu, bude třeba časem optimalizovat
    vyuziti moji funkce togglediv na prepinani viditelnosti tlacitek
*/
/*const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);*/

const quizid = urlParams.get('quizid');

if(quizid >= 1 && quizid <= 5){
    toggle_div("quizbuttons");
    toggle_div("homebutton")
    toggle_div("game")
    display_specific("templateDiv")
};



