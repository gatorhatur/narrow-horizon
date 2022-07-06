
var apiKey = "JDLUYSFGP26C38G5C7DQ5UGV5"


var city = "Greensboro";

//need a css file with Id's that handle the icons


var getForeCast = function () {
    var apiUrl = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast?locations=" + city+"&aggregateHours=24&forecastDays=6&contentType=json&iconSet=icons2&key=" + apiKey;
    console.log(apiUrl)
    fetch(apiUrl).then(function (response) {
        console.log(response);
    });


    //console.log(response);


}
//web call

