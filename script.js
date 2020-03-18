// This is our API key
var APIKey = "&appid=ea5dcc62ea693e8b6f985f5c67ba8824";

var cities = [];

init();

function init() {

  var storedCities = JSON.parse(localStorage.getItem("cities"));

  if (storedCities !== null){
    cities = storedCities;
  }
  renderButtons();
}

function storeCities() {
  localStorage.setItem("cities", JSON.stringify(cities));
}

function displayCityWeather(){
    
  var lat = "";
  var lon = "";

    // Here we are building the URL we need to query the database
    var cityInput = $(this).attr("city-name");
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityInput + APIKey;
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityInput + APIKey;

    console.log(queryURL);

    //OpenWeatherMap API
    $.ajax({
      url: queryURL,
      method: "GET",
    
      // Using success to dictate the order of AJAX calls
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
      
// UV Index API
      $.ajax({
        url: "https://api.openweathermap.org/data/2.5/uvi?" + APIKey + "&lat=" + lat + "&lon=" + lon,
        method: "GET",
      })
      
      .then(function (uv){
      
        $("#uv").html('UV Index: <span id="uv">' + uv.value + "</span>");
        console.log(uv);

      });
//Forecast API   
      $.ajax({
        url: forecastURL + "&units=imperial",
        method: "GET",
      })
      .then(function (fc){
        var iconURL = "http://openweathermap.org/img/wn/";
        var weathercond = fc.list[2].weather[0].main;
        var weathercond2 = fc.list[10].weather[0].main;
        var weathercond3 = fc.list[18].weather[0].main;
        var weathercond4 = fc.list[26].weather[0].main;
        var weathercond5 = fc.list[34].weather[0].main;

        console.log(fc);

        //Add for loop if I have time, with datecounter increasing by 8
        $("#date1").text(fc.list[2].dt_txt);
        if (weathercond == "Clear"){
          $("#fcimg1").attr("src", iconURL + "01d.png");
        }
        else if (weathercond == "Clouds"){
          $("#fcimg1").attr("src", iconURL + "03d.png");
        }
        else if (weathercond == "Thunderstorm"){
          $("#fcimg1").attr("src", iconURL + "11d.png");
        }
        else if (weathercond == "Drizzle"){
          $("#fcimg1").attr("src", iconURL + "09d.png");
        }
        else if (weathercond == "Rain"){
          $("#fcimg1").attr("src", iconURL + "10d.png");
        }
        else if (weathercond == "Snow"){
          $("#fcimg1").attr("src", iconURL + "13d.png");
        }
        else {
          $("#fcimg1").attr("src", iconURL + "50d.png");
        }
        $("#fctemp1").text('Temp: ' + fc.list[2].main.temp + "F");
        $("#fchumidity1").text('Humidity: ' + fc.list[2].main.humidity + "%");
        
        $("#date2").text(fc.list[10].dt_txt);
        if (weathercond2 == "Clear"){
          $("#fcimg2").attr("src", iconURL + "01d.png");
        }
        else if (weathercond2 == "Clouds"){
          $("#fcimg2").attr("src", iconURL + "03d.png");
        }
        else if (weathercond2 == "Thunderstorm"){
          $("#fcimg2").attr("src", iconURL + "11d.png");
        }
        else if (weathercond2 == "Drizzle"){
          $("#fcimg2").attr("src", iconURL + "09d.png");
        }
        else if (weathercond2 == "Rain"){
          $("#fcimg2").attr("src", iconURL + "10d.png");
        }
        else if (weathercond2 == "Snow"){
          $("#fcimg2").attr("src", iconURL + "13d.png");
        }
        else {
          $("#fcimg2").attr("src", iconURL + "50d.png");
        }
        $("#fctemp2").text('Temp: ' + fc.list[10].main.temp + "F");
        $("#fchumidity2").text('Humidity: ' + fc.list[10].main.humidity + "%");

        $("#date3").text(fc.list[18].dt_txt);
        if (weathercond3 == "Clear"){
          $("#fcimg3").attr("src", iconURL + "01d.png");
        }
        else if (weathercond3 == "Clouds"){
          $("#fcimg3").attr("src", iconURL + "03d.png");
        }
        else if (weathercond3 == "Thunderstorm"){
          $("#fcimg3").attr("src", iconURL + "11d.png");
        }
        else if (weathercond3 == "Drizzle"){
          $("#fcimg3").attr("src", iconURL + "09d.png");
        }
        else if (weathercond3 == "Rain"){
          $("#fcimg3").attr("src", iconURL + "10d.png");
        }
        else if (weathercond3 == "Snow"){
          $("#fcimg3").attr("src", iconURL + "13d.png");
        }
        else {
          $("#fcimg3").attr("src", iconURL + "50d.png");
        }
        $("#fctemp3").text('Temp: ' + fc.list[18].main.temp + "F");
        $("#fchumidity3").text('Humidity: ' + fc.list[18].main.humidity + "%");

        $("#date4").text(fc.list[26].dt_txt);
        if (weathercond4 == "Clear"){
          $("#fcimg4").attr("src", iconURL + "01d.png");
        }
        else if (weathercond4 == "Clouds"){
          $("#fcimg4").attr("src", iconURL + "03d.png");
        }
        else if (weathercond4 == "Thunderstorm"){
          $("#fcimg4").attr("src", iconURL + "11d.png");
        }
        else if (weathercond4 == "Drizzle"){
          $("#fcimg4").attr("src", iconURL + "09d.png");
        }
        else if (weathercond4 == "Rain"){
          $("#fcimg4").attr("src", iconURL + "10d.png");
        }
        else if (weathercond4 == "Snow"){
          $("#fcimg4").attr("src", iconURL + "13d.png");
        }
        else {
          $("#fcimg4").attr("src", iconURL + "50d.png");
        }
        $("#fctemp4").text('Temp: ' + fc.list[26].main.temp + "F");
        $("#fchumidity4").text('Humidity: ' + fc.list[26].main.humidity + "%");

        $("#date5").text(fc.list[34].dt_txt);
        if (weathercond5 == "Clear"){
          $("#fcimg5").attr("src", iconURL + "01d.png");
        }
        else if (weathercond5 == "Clouds"){
          $("#fcimg5").attr("src", iconURL + "03d.png");
        }
        else if (weathercond5 == "Thunderstorm"){
          $("#fcimg5").attr("src", iconURL + "11d.png");
        }
        else if (weathercond5 == "Drizzle"){
          $("#fcimg5").attr("src", iconURL + "09d.png");
        }
        else if (weathercond5 == "Rain"){
          $("#fcimg5").attr("src", iconURL + "10d.png");
        }
        else if (weathercond5 == "Snow"){
          $("#fcimg5").attr("src", iconURL + "13d.png");
        }
        else {
          $("#fcimg5").attr("src", iconURL + "50d.png");
        }
        $("#fctemp5").text('Temp: ' + fc.list[34].main.temp + "F");
        $("#fchumidity5").text('Humidity: ' + fc.list[34].main.humidity + "%");


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
    storeCities();
    // displayUV();
});

$(document).on("click", ".city", displayCityWeather);
// $(document).on("click", ".city", displayUV);

renderButtons();