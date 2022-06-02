//to access doms
const timeWeather = document.getElementById("timeWeather");
const links = document.getElementById("links");
const search = document.getElementById("search");
const page = document.getElementById("page");
var intervalClock;


let nasaImageURL = nasaImage();

//event listeners
timeWeather.addEventListener("click",function(){ timeWeatherClick()});
links.addEventListener("click",function(){linksClick()});
search.addEventListener("click", function(){searchClick()});


//EventListeners' functions
function timeWeatherClick(){
    if(page.id != "pageTimeWeather"){
        page.innerHTML = " ";
        page.setAttribute("id", "pageTimeWeather");
        intervalClock = setInterval(function(){time(), 1000});
    }else {
        clear();
        };
    console.log("1");

};
function linksClick(){
    if(page.id != "pageLinks"){
        page.setAttribute("id", "pageLinks");
        addLinks();
    }else {
        clear();

    }
    console.log("2");
};

function searchClick(){
    if(page.id != "pageSearch"){
        page.setAttribute("id", "pageSearch");
        searchBar();
    }else{
        clear();

    };
    console.log("2");
};

//clear site
function clear(){
    page.setAttribute('id', 'page');
    intervalClock = null;
    page.innerHTML = " ";
    console.log('clear');
    setBackground(nasaImageURL);
}

//function for clock
function time(){
    if(page.id == "pageTimeWeather"){
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();
    var am_pm;
    if(hour > 12){
        am_pm = "PM";
    } else{ am_pm = "AM" };

    var setHour = hour < 10 ? "0" + hour : hour;
    var setMin = min < 10 ? "0" + min : min;
    var setSec = sec < 10 ? "0" + sec : sec;

    let currentTime = setHour + ":" + setMin + ":" + setSec + am_pm
    page.innerHTML = ` 
    <div id ="clock" > ${currentTime} </div>
    `;
    } else return;
}
//function to add links
function addLinks(){
    intervalClock = null;
    page.innerHTML = `
    <a href="https://www.facebook.com" target="_blank" class="fa fa-facebook fa-3x">Facebook</a>
    <a href="https://campus.uveg.edu.mx/" target="_blank" class="fa-solid fa-chalkboard fa-3x">UVEG</a>
    <a href="https://campus.unadmexico.mx/login/index.php" target="_blank"  class="fa-solid fa-chalkboard-user fa-3x">UNADM</a>    `
    ;
};

//function for searchbar
function searchBar(){
     intervalClock = null;
     //this button isn't mine, credits go to Short Code 
     //https://codepen.io/ShortCode/pen/jOrBeOw
     page.innerHTML = `
     <div class = "box" >
     <form name = "search">
         <input id = "searchBox" type = "text" class = "input" name = "txt">
     </form>
         <i class = "fas fa-search" id = "searchIcon"></i>
 </div>`
/* 
 <div id = "searchEngines">
 <i class="fa-brands fa-google"></i>
 <i class = "fa-brands fa-youtube" id = "youtube"></i>
 <i class = "fa-solid fa-brain-circuit"></i>
 </div> */
    const searchBox = document.getElementById('searchBox');
    const searchIcon = document.getElementById('searchIcon')
    searchBox.addEventListener("mouseleave", function(){
        searchBox.setAttribute("class",  "boxHover");
        searchIcon.setAttribute("id", "SIH");
    }) 
    const search = document.querySelector('.input');
    /** search.addEventListener("input", (e)){

    };**/
}

//function for weather

//function for NASA API
async function nasaImage(){
    //really bad convention but only way for it to work in github pages
    let NASA_KEY = 'yb4k0TQ19Mvi9JjAEmKvIkkYweuWsuPhKhTWVeXc'
    //should never do this with APIs nor critical information, better use .env
    var response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_KEY}`);
    var responseJSON = await response.json();
    return responseJSON;
};


//in case you want a background image
function setBackground(data){
    console.log('trying to set bg')
    if(page.getAttribute('id') == 'page'){
        console.log('so far so good');
        console.log(toString(data.copyright));
        page.style.backgroundImage = `url("${data.url}")`;
    }
}