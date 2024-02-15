const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlId = urlParams.get('id') //získá tisícový id hry z URL
const urlQuizId = urlParams.get('quizid')

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
        if (templatesIdslist[i].id === urlId){
            templatesIdslist[i].style.display = "block"
        }else{
            templatesIdslist[i].style.display = "none"
        }
    }
    };


const tabIdList = ["10", "11", "12"]
function reply_click(clicked_id){
    location.href = '../?quizid='+clicked_id+'&id='+clicked_id+'000'; /*Přidal jsem jednoduše, aby se určoval tisícový řád podle id */
};

function go_to_tab(tab){
    location.href = '../'+tab
}

const quizid = urlParams.get('quizid');

if(quizid >= 1 && quizid <= 13){
    toggle_div("quizbuttons");
    toggle_div("homebutton")
    toggle_div("game")
    display_specific("templateDiv")
};



