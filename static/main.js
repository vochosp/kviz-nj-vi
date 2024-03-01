queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlId = urlParams.get('id') //získá tisícový id hry z URL
const urlQuizId = urlParams.get('quizid')
previousPage = ""



function toggle_div(divid){
    if(urlId < 10000){
        var x = document.getElementById(divid);
        if (x.style.display === "none") {
            x.style.display = "block";
        } else {
             x.style.display = "none";
        }
    }  

};

/*simply udělá list divů podle classy, kterou jsem jim přidělil (templateDiv)
a pokud se idčko divu nerovná idčku templatu z url, je jeho style.display nastavený na none - nevypisuje se
*/

function display_specific(divId){   
    const templatesIdslist = document.getElementsByClassName(divId); //je to class, ne id
    for (let i = 0; i<templatesIdslist.length; i++){
        if (templatesIdslist[i].id[0] === urlId[0]){
            templatesIdslist[i].style.display = "block"
        }else{
            templatesIdslist[i].style.display = "none"
        }
    }
    };



function reply_click(clicked_id){
    location.href = '../?quizid='+clicked_id+'&id='+clicked_id+'000';
};
console.log(localStorage.getItem("previousPage"))

function go_to_tab(tab){
    location.href = '../'+tab
}

const quizid = urlParams.get('quizid');

//zobrazí züruck button jen na hrách a na sadách
const tabIdList = ["tab1", "tab2", "tab3"];
const locationHref = location.href;
if (quizid >=1 || tabIdList.some(tabIndex => locationHref.includes(tabIndex))) {
    toggle_div("homebutton")
    document.getElementById("music").style.display = "none";
    
}


if(tabIdList.some(tabIndex => locationHref.includes(tabIndex))){
    previousPage = "../"

}
else if ((quizid) > 0) {
    document.getElementById("homebutton").style.display = "none"
}

function go_to_previous_page(){
    location.href = previousPage
}

function go_to_main_menu(){
    location.href = '/'
}



if(quizid >= 1 && quizid <= 10){
    toggle_div("quizbuttons")
    toggle_div("game")
    display_specific("templateDiv")
    document.getElementById("music").style.display = "none";
};
console.log(previousPage)

window.onload = function() {
    document.getElementById("music").play();
}