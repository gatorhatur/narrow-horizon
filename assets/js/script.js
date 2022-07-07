
var apiKey = "JDLUYSFGP26C38G5C7DQ5UGV5"
var city = "Greensboro";
var state = ""; //bonus points

//need a css file with Id's that handle the icons
var currentWeather = [];
var forecast = [];
var dateFormat = "MM/DD/YY";

var getForeCast = function () {
    var apiUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=" + city+"&aggregateHours=24&forecastDays=6&contentType=json&iconSet=icons2&shortColumnNames=true&key=" + apiKey;
    //console.log(apiUrl)

    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                currentWeather = data.locations;
                console.log(currentWeather);

                city = currentWeather[Object.keys(currentWeather)[0]].address;
                forecast = currentWeather[Object.keys(currentWeather)[0]].values;
                currentWeather = currentWeather[Object.keys(currentWeather)[0]].currentConditions;
                setCurrentConditions();
                setForecast();
                })
            
        }
    })

}

var setCurrentConditions = function () {
    var uvi = parseInt(forecast[0].uvindex);
    var uvEl = $("#today-uv").text(uvi);
    
    $("#searched-city").text(city);
    $("#today").text("(" + dayjs().format(dateFormat) + ")");
    $("#today-castmoji").attr("src", getIcon(forecast[0].conditions));
    $("#today-temp").text(currentWeather.temp+" \xB0F");
    $("#today-wind").text(currentWeather.wspd+" MPH");
    $("#today-humidity").text(currentWeather.humidity+"%");

    //translate values of uv index
    if (uvi <= 2) {
        uvEl.addClass("bg-success px-2 shadow-sm rounded");
    }
    else if (uvi <= 6) {
        uvEl.addClass("bg-warning px-2 shadow-sm rounded");
    }
    else {
        uvEl.addClass("bg-danger px-2 shadow-sm rounded");
    }
}

var setForecast = function () {
    var container = $("#forecast-row")
     
    //must be seperated to prevent the info from staying removed    
    container 
        .children()
        .remove();
    
    for (var i = 1; i < forecast.length; i++) {
        //console.log(forecast[i].temp);
        var dayEl = $("<div>")
            .addClass("rounded mt-2 col-12 col-md-5 col-xl-2 bg-dark text-light pt-1")
            .attr("id",i+"-day");

        var date = $("<p>")          
            .text(dayjs().add(i, 'days').format(dateFormat))
            .addClass("h5");
        dayEl.append(date);
        
        var icon = $("<img>")
            .text(forecast[i].conditions)
            .attr("src", getIcon(forecast[i].conditions));
        dayEl.append(icon);

        var temp = $("<p>")
            .text("Temp: "+ forecast[i].temp+" \xB0F"); //need to add degrees
        dayEl.append(temp);

        var wind = $("<p>")
            .text("Wind: "+forecast[i].wspd+" MPH");
        dayEl.append(wind);

        var humidity = $("<p>")
            .text("Humidity: "+ forecast[i].humidity+ "%");
        dayEl.append(humidity);
        
        container.append(dayEl);
    }
}

var getIcon = function (condition) {
    switch (condition.toLowerCase()) {
        case "rain":
        case "rain, partially cloudy":
        case "rain, overcast":
            return "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/rain.png";
        case "partially cloudy":
            return "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/partly-cloudy-day.png";
        case "overcast":
            return "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/cloudy.png";
        default:
            return "https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/2nd%20Set%20-%20Color/clear-day.png";
    
    }
}

getForeCast()


