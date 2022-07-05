
var apiKey = "9c59fa0d777a42a2860191113220507"

var apiUrl = "https://api.weatherapi.com/v1/forecast.json?key="+apiKey+"&q=Rome&days=5"

var getForeCast = function (city) {
    console.log(apiUrl)
    var response = fetch(apiUrl);


    console.log(response);


}
//web call

