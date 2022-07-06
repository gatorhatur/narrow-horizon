
var apiKey = "JDLUYSFGP26C38G5C7DQ5UGV5"
var city = "Greensboro";
var state = ""; //bonus points

//need a css file with Id's that handle the icons
var currentWeather = [];
var forecast = [];
var dateFormat = "MM/DD/YY";

var getForeCast = function () {
    var apiUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=" + city+"&aggregateHours=24&forecastDays=6&contentType=json&iconSet=icons2&shortColumnNames=true&key=" + apiKey;
    console.log(apiUrl)
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                currentWeather = data.locations;
                forecast = currentWeather[Object.keys(currentWeather)[0]].values;
                currentWeather = currentWeather[Object.keys(currentWeather)[0]].currentConditions;
                })
            
        }
    })

}

var setCurrentConditions = function () {
    $("#searched-city").text(city);
    $("#today").text("("+dayjs().format(dateFormat)+")");
    $("#today-temp").text(currentWeather.temp);
    $("#today-wind").text(currentWeather.wspd);
    $("#today-humidity").text(currentWeather.humidity);
    $("#today-uv").text(forecast[0].uvindex);
}

var setForecast = function () {
    var container = $("#forecast-row");
    container
        .children()
        .remove();
    for (var i = 1; i < forecast.length; i++) {
        console.log(forecast[i].temp);
        var dayEl = $("<div>")
            .addClass("rounded mt-2 col-12 col-md-5 col-xl-2 bg-dark text-light pt-1")
            .attr("id",i+"-day");

        var date = $("<p>")          
            .text(dayjs().add(i, 'days').format(dateFormat))
            .addClass("h5");
        dayEl.append(date);
        
        var icon = $("<img>");
        dayEl.append(icon);

        var temp = $("<p>")
            .text("Temp: "+ forecast[i].temp+" F"); //need to add degrees
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

