function toggle_div(divid){
    var x = document.getElementById(divid);
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
         x.style.display = "none";
    }
};

function reply_click(clicked_id){
    /*
        Alert potom get predani id do url
    */
    /*alert("ID tlacitka je: "+clicked_id); */
    /* pridano ID otazky */
    console.log(clicked_id);
    location.href = '../?quizid='+clicked_id+'&id=0000';
    
    
};

/*
    recyklace getu, bude třeba časem optimalizovat
    vyuziti moji funkce togglediv na prepinani viditelnosti tlacitek
*/
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const quizid = urlParams.get('quizid');
console.log(quizid);

/*Dá se na onclick buttonu odkazující na stránku*/
function go_to_URL(buttonURL){
    location.href= '../'+buttonURL
}

if(quizid >= 1 && quizid <= 3){
    toggle_div("quizbuttons");
    toggle_div("homebutton")
    toggle_div("game")
};