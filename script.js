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

    var searchInput = "";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?appid=ea5dcc62ea693e8b6f985f5c67ba8824&q="
    var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?appid=ea5dcc62ea693e8b6f985f5c67ba8824&q="
    var fullURL = "";
    var fullFCURL = "";

function displayCityWeather(){
    
  var lat = "";
  var lon = "";

    // Here we are building the URL we need to query the database
   
    console.log(fullURL);
    console.log(fullFCURL);

    //OpenWeatherMap API
    $.ajax({
      url: fullURL,
      method: "GET",
    
      // Using success to dictate the order of AJAX calls
      success: function(response) {

        // Log the resulting object
        console.log(response);
        
        // Transfer content to HTML
        var currentDate = new Date(response.dt * 1000)
        $("#city").text(response.name + " (" + (currentDate.getMonth() + 1) + "/" + currentDate.getDate() + "/" + currentDate.getFullYear() + ") ");
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
      
      
      success: function (uv){

      console.log(uv.value);
        
      if (uv.value <= 2.5){
        $("#uv").html('UV Index: <span class="bg-success text-white">' + uv.value + "</span>");
      }
      else if (uv.value > 2.5  && uv.value <= 5.5){
        $("#uv").html('UV Index: <span class="bg-warning">' + uv.value + "</span>");
      }
      else if (uv.value > 5.5 && uv.value <= 7.5){
        $("#uv").html('UV Index: <span class="bg-orange text-white">' + uv.value + "</span>");
      }
      else if (uv.value > 7.5 && uv.value <= 10.5){
        $("#uv").html('UV Index: <span class="bg-danger text-white">' + uv.value + "</span>");
      }
      else {
        $("#uv").html('UV Index: <span class="bg-dark text-white">' + uv.value + "</span>");
      }
    }
  });
//Forecast API   
      $.ajax({
        url: fullFCURL + "&units=imperial",
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
        var currentWC = response.weather[0].main;
        if (currentWC == "Clear"){
          $("#currentimg").attr("src", iconURL + "01d@2x.png");
        }
        else if (currentWC == "Clouds"){
          $("#currentimg").attr("src", iconURL + "03d@2x.png");
        }
        else if (currentWC == "Thunderstorm"){
          $("#currentimg").attr("src", iconURL + "11d@2x.png");
        }
        else if (currentWC == "Drizzle"){
          $("#currentimg").attr("src", iconURL + "09d@2x.png");
        }
        else if (currentWC == "Rain"){
          $("#currentimg").attr("src", iconURL + "10d@2x.png");
        }
        else if (currentWC == "Snow"){
          $("#currentimg").attr("src", iconURL + "13d@2x.png");
        }
        else {
          $("#currentimg").attr("src", iconURL + "50d@2x.png");
        }

        var date1 = new Date(fc.list[2].dt * 1000)
        $("#date1").text((date1.getMonth() + 1) + "/" + date1.getDate() + "/" + date1.getFullYear());
        if (weathercond == "Clear"){
          $("#fcimg1").attr("src", iconURL + "01d@2x.png");
        }
        else if (weathercond == "Clouds"){
          $("#fcimg1").attr("src", iconURL + "03d@2x.png");
        }
        else if (weathercond == "Thunderstorm"){
          $("#fcimg1").attr("src", iconURL + "11d@2x.png");
        }
        else if (weathercond == "Drizzle"){
          $("#fcimg1").attr("src", iconURL + "09d@2x.png");
        }
        else if (weathercond == "Rain"){
          $("#fcimg1").attr("src", iconURL + "10d@2x.png");
        }
        else if (weathercond == "Snow"){
          $("#fcimg1").attr("src", iconURL + "13d@2x.png");
        }
        else {
          $("#fcimg1").attr("src", iconURL + "50d@2x.png");
        }
        $("#fctemp1").text('Temp: ' + fc.list[2].main.temp + "F");
        $("#fchumidity1").text('Humidity: ' + fc.list[2].main.humidity + "%");
        
        var date2 = new Date(fc.list[10].dt * 1000)
        $("#date2").text((date2.getMonth() + 1) + "/" + date2.getDate() + "/" + date2.getFullYear());
        if (weathercond2 == "Clear"){
          $("#fcimg2").attr("src", iconURL + "01d@2x.png");
        }
        else if (weathercond2 == "Clouds"){
          $("#fcimg2").attr("src", iconURL + "03d@2x.png");
        }
        else if (weathercond2 == "Thunderstorm"){
          $("#fcimg2").attr("src", iconURL + "11d@2x.png");
        }
        else if (weathercond2 == "Drizzle"){
          $("#fcimg2").attr("src", iconURL + "09d@2x.png");
        }
        else if (weathercond2 == "Rain"){
          $("#fcimg2").attr("src", iconURL + "10d@2x.png");
        }
        else if (weathercond2 == "Snow"){
          $("#fcimg2").attr("src", iconURL + "13d@2x.png");
        }
        else {
          $("#fcimg2").attr("src", iconURL + "50d@2x.png");
        }
        $("#fctemp2").text('Temp: ' + fc.list[10].main.temp + "F");
        $("#fchumidity2").text('Humidity: ' + fc.list[10].main.humidity + "%");

        var date3 = new Date(fc.list[18].dt * 1000)
        $("#date3").text((date3.getMonth() + 1) + "/" + date3.getDate() + "/" + date3.getFullYear());
        if (weathercond3 == "Clear"){
          $("#fcimg3").attr("src", iconURL + "01d@2x.png");
        }
        else if (weathercond3 == "Clouds"){
          $("#fcimg3").attr("src", iconURL + "03d@2x.png");
        }
        else if (weathercond3 == "Thunderstorm"){
          $("#fcimg3").attr("src", iconURL + "11d@2x.png");
        }
        else if (weathercond3 == "Drizzle"){
          $("#fcimg3").attr("src", iconURL + "09d@2x.png");
        }
        else if (weathercond3 == "Rain"){
          $("#fcimg3").attr("src", iconURL + "10d@2x.png");
        }
        else if (weathercond3 == "Snow"){
          $("#fcimg3").attr("src", iconURL + "13d@2x.png");
        }
        else {
          $("#fcimg3").attr("src", iconURL + "50d@2x.png");
        }
        $("#fctemp3").text('Temp: ' + fc.list[18].main.temp + "F");
        $("#fchumidity3").text('Humidity: ' + fc.list[18].main.humidity + "%");

        var date4 = new Date(fc.list[26].dt * 1000)
        $("#date4").text((date4.getMonth() + 1) + "/" + date4.getDate() + "/" + date4.getFullYear());
        if (weathercond4 == "Clear"){
          $("#fcimg4").attr("src", iconURL + "01d@2x.png");
        }
        else if (weathercond4 == "Clouds"){
          $("#fcimg4").attr("src", iconURL + "03d@2x.png");
        }
        else if (weathercond4 == "Thunderstorm"){
          $("#fcimg4").attr("src", iconURL + "11d@2x.png");
        }
        else if (weathercond4 == "Drizzle"){
          $("#fcimg4").attr("src", iconURL + "09d@2x.png");
        }
        else if (weathercond4 == "Rain"){
          $("#fcimg4").attr("src", iconURL + "10d@2x.png");
        }
        else if (weathercond4 == "Snow"){
          $("#fcimg4").attr("src", iconURL + "13d@2x.png");
        }
        else {
          $("#fcimg4").attr("src", iconURL + "50d@2x.png");
        }
        $("#fctemp4").text('Temp: ' + fc.list[26].main.temp + "F");
        $("#fchumidity4").text('Humidity: ' + fc.list[26].main.humidity + "%");

        var date5 = new Date(fc.list[34].dt * 1000)
        $("#date5").text((date5.getMonth() + 1) + "/" + date5.getDate() + "/" + date5.getFullYear());
        if (weathercond5 == "Clear"){
          $("#fcimg5").attr("src", iconURL + "01d@2x.png");
        }
        else if (weathercond5 == "Clouds"){
          $("#fcimg5").attr("src", iconURL + "03d@2x.png");
        }
        else if (weathercond5 == "Thunderstorm"){
          $("#fcimg5").attr("src", iconURL + "11d@2x.png");
        }
        else if (weathercond5 == "Drizzle"){
          $("#fcimg5").attr("src", iconURL + "09d@2x.png");
        }
        else if (weathercond5 == "Rain"){
          $("#fcimg5").attr("src", iconURL + "10d@2x.png");
        }
        else if (weathercond5 == "Snow"){
          $("#fcimg5").attr("src", iconURL + "13d@2x.png");
        }
        else {
          $("#fcimg5").attr("src", iconURL + "50d@2x.png");
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
        c.addClass("city btn bg-white btn-block border");
        c.attr("city-name", cities[i]);
        c.text(cities[i]);
        $("#cityBtns").prepend(c);
    }

};

$("#searchBtn").on("click", function(e){
    e.preventDefault();
    var city = $("#search").val().trim();
    searchInput = city;
    fullURL = "";
    fullFCURL = ""; 
    fullURL = queryURL + searchInput;
    fullFCURL = forecastURL + searchInput;
    cities.push(city);
    displayCityWeather();
    renderButtons();
    storeCities();
    if ($("#forecast").attr("class") === "d-none"){
      $("#forecast").removeClass("d-none");
      $("#forecast").addClass("d-block");
    }
});

$(document).on("click", ".city", function(){
  
  var btnInput = $(this).attr("city-name");
  fullURL = "";
  fullFCURL = "";  
  fullURL = queryURL + btnInput;
  fullFCURL = forecastURL + btnInput;
  displayCityWeather();
  if ($("#forecast").attr("class") === "d-none"){
    $("#forecast").removeClass("d-none");
    $("#forecast").addClass("d-block");
  }
});

$("#clear").on("click", function(){
  $("#cityBtns").empty();
  cities = [];
  localStorage.clear();
  //Potential Clear Current City Btn:
  // $("#city").text("Please Select a City");
  // $("#currentimg").attr("src", "");
  // $("#temp").text("");
  // $("#humidity").text("");
  // $("#wind").text("");
  // $("#uv").text("");
  // if ($("#forecast").attr("class") === "d-block"){
  //   $("#forecast").removeClass("d-block");
  //   $("#forecast").addClass("d-none");
  // }
});

renderButtons();

//if search button is pressed, query + search, run all functions
//else if city buttons are pressed. query + button, run all functions