var cityBtns = "";
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q="
var key = "85a1b3cee1181b7428bebe7b121c551f";
var units = "imperial";
var cityInput = $(this).val("#searchInput");

var weatherDescription = document.getElementById("weatherDescription"); // or weatherDescriptionHeader
var temperatureElement = document.getElementById("temperature");
var humidityElement = document.getElementById("humidity");
var windSpeedElement = document.getElementById("windSpeed");
var cityHeader = document.getElementById("cityHeader");

var oneDay = document.getElementById("day1")
var twoDay = document.getElementById("day2")

var dt = moment().format('MMMM Do, YYYY');


var searchMethod;

// localStorage.clear();

// ZIP OR CITY
function getSearchMethod(searchTerm) {
    if (searchTerm.length === 5 && Number.parseInt(searchTerm) + "" === searchTerm)
        searchMethod = "zip";
    else
        searchMethod = "q";


}




function searchWeather(searchTerm) {
    getSearchMethod(searchTerm);


    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchTerm + "&appId=" + key + "&units=" + units;


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response)

        // moment().format('LL');
        // var weatherToday = response.weather[0].main;
        $("#theDate").html("<b>" + moment().format('LL') + "</b>");
        // $("#theDate").text("Today: " + response.list[0].dt);  .add day1 + figure it out
        ///// NEEDS THIS FORMAT  var dtDate = moment().format('MMMM Do, YYYY');

        // var cityName = response.name;
        $("#cityHeader").text("City:  " + response.city.name);

        var weatherDescript = response.list[0].weather[0].description

        $("#weatherDescription").html("<h5>" + "Current conditions: " + weatherDescript.charAt(0).toUpperCase() + weatherDescript.slice(1) + "</h5>");

        // var theTemp = response.main.temp;
        // var tempF = (response.list[0].main.temp) - 273.15 * 1.80 + 32;
        // console.log(tempF)
        // var temp = cutDecimals(temp, 0);
        $("#temperature").html("Current Temperature: " + "<b>" + Math.floor(response.list[0].main.temp) + " &#176" + "F" + "</b>");

        // var theHumidity = response.main.humidity;
        $("#humidity").html("Humidity levels at " + "<b>" + response.list[0].main.humidity + " %" + "</b>");


        ////////////// NEEDS TO BE FIXED they worked the same
        // windSpeedElement.innerHTML = "Winds at " + Math.floor(response.list[0].wind.speed) + " m/s";
        $("#windSpeed").html("Winds at " + "<b>" + Math.floor(response.list[0].wind.speed) + " m/s" + "</b>");


        // $("#fiveDay").text(JSON.stringify(response));



        $("#day1").html("<b>" + moment().add(1, 'd').format('LL') + "</b>" + "<br>" + "Temperature: " + "<b>" + Math.floor(response.list[1].main.temp) + " &#176" + "F" + "</b>" + "<br>" + "Humidity levels at " + "<b>" + response.list[1].main.humidity + " %" + "</b>");

        $("#day2").html("<b>" + moment().add(2, 'd').format('LL') + "</b>" + "<br>" + "Temperature: " + "<b>" + Math.floor(response.list[2].main.temp) + " &#176" + "F" + "</b>" + "<br>" + "Humidity levels at " + "<b>" + response.list[2].main.humidity + " %" + "</b>");

        $("#day3").html("<b>" + moment().add(3, 'd').format('LL') + "</b>" + "<br>" + "Temperature: " + "<b>" + Math.floor(response.list[3].main.temp) + " &#176" + "F" + "</b>" + "<br>" + "Humidity levels at " + "<b>" + response.list[3].main.humidity + " %" + "</b>");

        $("#day4").html("<b>" + moment().add(4, 'd').format('LL') + "</b>" + "<br>" + "Temperature: " + "<b>" + Math.floor(response.list[4].main.temp) + " &#176" + "F" + "</b>" + "<br>" + "Humidity levels at " + "<b>" + response.list[4].main.humidity + " %" + "</b>");

        $("#day5").html("<b>" + moment().add(5, 'd').format('LL') + "</b>" + "<br>" + "Temperature: " + "<b>" + Math.floor(response.list[5].main.temp) + " &#176" + "F" + "</b>" + "<br>" + "Humidity levels at " + "<b>" + response.list[5].main.humidity + " %" + "</b>");

        ////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////

        var iconPic = document.getElementById("weatherIcon");

        iconPic.src = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + ".png";

        ////////////////////////////////////////////////////////
        ////////////////////////////////////////////////////////

        console.log("Today: " + moment().toDate());
        console.log("City:  " + response.city.name);
        console.log("Current Temperature: " + response.list[0].main.temp + " degrees");
        console.log("Humidity levels at " + response.list[0].main.humidity + " %");
        console.log("Winds at " + Math.floor(response.list[0].wind.speed) + " m/s");

        console.log(moment().add(1, 'd').toDate() + response.list[1].main.temp + " degrees " + response.list[1].main.humidity + " %");
        console.log(moment().add(2, 'd').toDate() + response.list[2].main.temp + " degrees " + response.list[2].main.humidity + " %");
        console.log(moment().add(3, 'd').toDate() + response.list[3].main.temp + " degrees " + response.list[3].main.humidity + " %");
        console.log(moment().add(4, 'd').toDate() + response.list[4].main.temp + " degrees " + response.list[4].main.humidity + " %");
        console.log(moment().add(5, 'd').toDate() + response.list[5].main.temp + " degrees " + response.list[5].main.humidity + " %");




        searchWeather(response.city.coord.lat, response.city.coord.lon);
        getUV(response.city.coord.lat, response.city.coord.lon);


        // ********************************* NOT WORKING??? HOW TO ????
        // *********** HOW TO LOCAL STORAGE ?????     ***********
        // *********** HOW TO LOCAL STORAGE ?????     ***********
        var name = response.city.name;
        var dt = moment().format('MMMM Do, YYYY');
        // var icon = response.weather[0].icon;
        var speed = response.list[0].wind.speed;
        var humidity = response.list[0].main.humidity;
        var temp = response.list[0].main.temp;

        // // How to make these work??

        // localStorage.setItem("curr_name", name);
        // localStorage.setItem("curr_dt", dt);
        // // localStorage.setItem("curr_icon", icon);
        // localStorage.setItem("curr_speed", speed);
        // localStorage.setItem("curr_humidity", humidity);
        // localStorage.setItem("curr_temp", temp);

        // localStorage.ForecastweatherCache = JSON.stringify({
        //     timestamp: (new Date()).getTime(),
        //     data: response
        // })


    });
}


// function capitalizeFirstLetter(weatherDescript) {
//     var weatherDescript = response.list[0].weather[0].description
//     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
// }



function getUV(vLat, vLon) {


    var key = "85a1b3cee1181b7428bebe7b121c551f";

    var queryURL = "https://api.openweathermap.org/data/2.5/uvi?lat=" + vLat + "&lon=" + vLon + "&appId=" + key;
    // + "&units=" + units ;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {

        console.log(queryURL);

        console.log(response)

        $("#uvIndex").html("UV Index: " + "<b>" + response.value + "</b>");

        console.log("UV Index: " + response.value);

    });
}




// function init(response) {


//     var type = document.getElementById("weatherIcon");
//     var theIcon = response.list[i].weather[0].icon; //// check this

//     // var img = document.createElement("img"); /// or create it
//     // img.src = "<img src=" + icon + ".jpg>";

//     switch (response.list[i].weather[0].icon) {

//         case "Clear": /// theIcon === "01d": //clear sky
//             // type = "01d"; 
//             $("#weatherIcon").html("<img src='01d.jpg' alt='Weather icon'>");
//             // document.getElementById("weatherIcon") = "url('01d.jpg')";
//             //     "UV Index: " + response.value);
//             // img.src = "url('images/01d.jpg)";
//             // alert("Please make a selection or go back to bed.");
//             break;

//         case "Cloudy": // theIcon === "02d": //few clouds
//             $("#weatherIcon").html("<img src='01d.jpg' alt='Weather icon'>");
//             // alert("I am glad you are happy.");
//             break;

//         case "Scattered Clouds": // theIcon === "03d": // scattered clouds
//             $("#weatherIcon").html("<img src='01d.jpg' alt='Weather icon'>");
//             // alert("I am sorry you are sad.");
//             break;

//         case "Broken Clouds": // theIcon === "04d": //broken clouds
//             $("#weatherIcon").html("<img src='01d.jpg' alt='Weather icon'>");
//             // alert("It is great you are feeling cool.");
//             break;

//         case "Rain Shower": // theIcon === "09d": // shower rain
//             $("#weatherIcon").html("<img src='01d.jpg' alt='Weather icon'>");
//             // alert("I hope you get past that soon.");
//             break;

//         case "Rainy": // theIcon === "10d": // rain
//             $("#weatherIcon").html("<img src='01d.jpg' alt='Weather icon'>");
//             // alert("I hope you get past that soon.");
//             break;

//         case "Thunderstorm": // theIcon === "11d":  // thunderstorm
//             $("#weatherIcon").html("<img src='01d.jpg' alt='Weather icon'>");
//             // alert("I hope you get past that soon.");
//             break;

//         case "Snow": // theIcon === "13d": // snow
//             $("#weatherIcon").html("<img src='01d.jpg' alt='Weather icon'>");
//             // alert("I hope you get past that soon.");
//             break;

//         case "Mist": // theIcon === "50d": // mist
//             $("#weatherIcon").html("<img src='01d.jpg' alt='Weather icon'>");
//             // alert("I hope you get past that soon.");
//             break;

//         default:
//             $("#weatherIcon").html("<img src='01d.jpg' alt='Weather icon'>");
//             // alert("You need to fix something!");
//             break;
//     }


// }


// div id = "icon" > < img id = "weatherIcon"
// src = ""
// alt = "Weather icon" > < /div>

// var weatherIcon = list.weather.icon;
// var iconImage = "<img src=images/icons/" + icon + ".jpg>";

// if icon === "o3n"

// (01 d.png)

// 01 d = clear sky
// 02 d = few clouds
// 03 d = scattered clouds
// 04 d = broken clouds
// 09 d = shower rain
// 10 d = rain
// 11 d = thunderstorm
// 13 d = snow
// 50 d = mist





$('#searchBtn').click(function() {
    $('.weatherContainers').toggle();
});

// $('#searchBtn').click(function() {
//     $('#futureWeatherContainer').toggle();
// });


document.getElementById("searchBtn").addEventListener("click", () => {
    var searchTerm = document.getElementById("searchInput").value;
    if (searchTerm)
        searchWeather(searchTerm);
});