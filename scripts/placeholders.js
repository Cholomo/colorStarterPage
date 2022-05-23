function timeWeatherfun(){
    var clock = page.appendChild(div);
    clock.setAttribute("id", "clock");
    function setTime(){
        var date= new Date();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();

        if(hour > 12){
            am_pm = "PM";
        }
        if(hour == 0){
            am_pm= "AM";
        }
        //to add the 0 at the beginning of the time, e.x: 03:09

        hour = hour < 10 ? "0" + hour : hour;
        min = min < 10 ? "0" + min : min;
        sec = sec < 10 ? "0" + sec : sec;

    //adding to html
       let currentTime = hour + ":" + min + ":" + sec + am_pm;
        console.log(currentTime);
        document.getElementById("clock").innerText = currentTime;
    };
    setInterval(function (){setTime()}, 1000);
    //weather fetch from API
    if('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude  = position.coords.latitude;
            const longitude = position.coords.longitude;

            const APIKey = '8b5c3853299f1b23c2c5ac96c5f2bef2'
            fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=metric&appid=${APIKey}`)
            .then(res => res.json()).then(data => {
              showWeatherData(data)
              changeWeatherIcon(data) 
              setUVIColor(data)
            })
            getWeather()
            
        });
    } 
    showWeatherData();
    //show weather data from API
    function showWeatherData(data){
        var clock = timeWeather.appendChild(div);
        clock.setAttribute("id", "weather");

        let {clouds, feels_like, sunset, temp, uvi, wind_speed, id} = data.current;
        let descr = data.current.weather['0'].description 
        var weatherinnerHTML = document.getElementById("weather").innerHTML = 
        `
        <div id = "clouds">
        <div id="temp">Temperature: </div>
        <div>${temp}</div>
        <div id="feels_like">Feels like: </div> 
        <div>${feels_like}</div>
        <div>UVI:</div>
        <div id ="uvi">${uvi}</div>
        <div id="description">Weather condition:</div>
        <div>${descr}<img  id="weather-icon"></div> 
        </div>`
    }
    //Change font color for uvi
    function setUVIColor(data){
    var colorUVI; 
    let uvi= data.current.uvi
    var setColorUVI = document.getElementById("uvi");

    if(uvi<2){
        ColorUVI = "green"
    }else if(uvi>3 && uvi<=5){
        ColorUVI = "yellow"
    }else if(uvi>6 && uvi <= 7){
        colorUVI = "orange"
    }else if( uvi>8 && uvi <=10){
        colorUVI = "red"
    }else if(uvi>=11){
        colorUVI = "purple"
    }
    setColorUVI.style.color = colorUVI
    }
    //Change background depending on weather
    function changeWeatherIcon(data){
        let idDesc = data.current.weather['0'].id 

        //getting system time
        let date = new Date();
        var hour = date.getHours()
        //getting sunrise time
        let sunriseUNIX =  data.current.sunrise
        let sunrise = new Date(sunriseUNIX*1000).getHours();
    
        //getting sunset time
        let sunsetUNIX =  data.current.sunset;
        let sunset = new Date(sunsetUNIX*1000).getHours();
    
        //setting letter for icon
        var letter;
        if(hour > sunrise && hour < sunset){
            letter = "d";
        }
        else if(hour < sunrise && hour > sunset){
            letter = "n";
        }   
    //setting image code
    var icon;
    if(idDesc >= 200 && idDesc <= 232){
        icon = "11d"
    }
    else if(idDesc >= 300 && idDesc <= 321){
        icon = "09d"
    }
    else if(idDesc >= 500 && idDesc <= 504){
        icon="10d"
    }else if(idDesc >= 520 && idDesc <= 531){
        icon = "09d"
    }else if(idDesc >= 600 && idDesc <= 622){
        icon = "13d"
    }else if(idDesc >= 700 && idDesc <= 781){
        icon = "50d"
    }
    else{
        switch(idDesc){
            case 501:
                icon = "13d" 
                break;
            case 800:
                icon= `01${letter}`
                break;
            case 801:
                icon = `02${letter}`
                break;
            case 802:
                icon = `03${letter}`
                break;
            case 803:
            case 804:
                icon = `04${letter}`
                break;
    }        
    
   }
     var weatherIcon = document.getElementById("weather-icon").src = 
        `http://openweathermap.org/img/wn/${icon}@2x.png`
    }}