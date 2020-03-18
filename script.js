// This is our API key
var APIKey = "&appid=ea5dcc62ea693e8b6f985f5c67ba8824";

  
    

    var cities = [];

function displayCityWeather(){
    
  var lat = "";
  var lon = "";

    // Here we are building the URL we need to query the database
    var cityInput = $(this).attr("city-name");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + APIKey;
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + APIKey;

    console.log(queryURL);

    // Here we run our AJAX call to the OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET",
    
      // We store all of the retrieved data inside of an object called "response"
      success: function(response) {

        // Log the resulting object
        console.log(response);
        
        // Transfer content to HTML
        $("#city").text(response.name + " Weather Details");
        $("#wind").text("Wind Speed: " + response.wind.speed + " MPH");
        $("#humidity").text("Humidity: " + response.main.humidity + "%");
        
        lat = response.coord.lat;
        lon = response.coord.lon;

        console.log(response.coord.lat);
        console.log(response.coord.lon);
        
        
        // Convert the temp to fahrenheit
        var tempF = (response.main.temp - 273.15) * 1.80 + 32;

        // add temp content to html
        $("#temp").text("Temperature " + tempF.toFixed(2) + " F");

        // Log the data in the console as well
        console.log("Wind Speed: " + response.wind.speed) + "MPH";
        console.log("Humidity: " + response.main.humidity) + "%";
        console.log("Temperature (F): " + tempF);
      
//     }
// function displayUV (){
      
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + lat + "&lon=" + lon,
        method: "GET",
      })
      
      .then(function (uv){
      
        $("#uv").html('UV Index: <span id="uv">' + uv.value + "</span>");
        console.log(uv);

      });
    
      $.ajax({
        url: forecastURL + "&units=imperial",
        method: "GET",
      })
      .then(function (fc){

        console.log(fc);

      });
    }
  }); 
};
function renderButtons() {

    $("#cityBtns").empty();

    for (var i = 0; i < cities.length; i++){
        var c = $("<button>");
        c.addClass("city btn");
        c.attr("city-name", cities[i]);
        c.text(cities[i]);
        $("#cityBtns").append(c);
    }

};

$("#searchBtn").on("click", function(e){
    e.preventDefault();
    var city = $("#search").val().trim();
    cities.push(city);
    displayCityWeather();
    renderButtons();
    // displayUV();
});

$(document).on("click", ".city", displayCityWeather);
// $(document).on("click", ".city", displayUV);

renderButtons();