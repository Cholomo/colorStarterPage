//to access doms
const timeWeather = document.getElementById("timeWeather");
const links = document.getElementById("links");
const search = document.getElementById("search");
const page = document.getElementById("page");
var intervalClock;

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
        page.setAttribute("id", "page");
        page.innerHTML = " ";
        intervalClock = null;
        };
    console.log("1");

};
function linksClick(){
    if(page.id != "pageLinks"){
        page.setAttribute("id", "pageLinks");
        addLinks();
    }else {
        page.setAttribute("id", "page");
        page.innerHTML = " ";
    }
    console.log("2");
};

function searchClick(){
    if(page.id != "pageSearch"){
        page.setAttribute("id", "pageSearch");
    }else page.setAttribute("id", "page");
    console.log("2");
};

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