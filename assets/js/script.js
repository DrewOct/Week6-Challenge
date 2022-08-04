// **  PSEUDO CODE (subject to change) ** //

// when user searches for a city (clicks search button):
//  - store the user input in a variable
//  - use a fetch api to get the current & future conditions for that city
//  - store that city into local storage
// use the data from fetch to populate in the current-weather container:
//  - name and today's date as M/DD/YYY
//  - temp
//  - wind
//  - humidity
//  - UV index (color coded for favorable(green), moderate(yellow), or severe(red))
// use the data from fetch to populate in the five-day container:
//  - date
//  - an icon reprsentation of weather conditions
//  - the temp
//  - wind speed
//  - humidity
// use data in local.storage to create a button under the <hr> in search area for city history
//  - when you click the button it displays the current and future conditions for that city

// ** END PSEUDO CODE ** //

// declare global variables
var individualAPIKey = "332fae95efe25e7ea4d125202af903bc";
var unit = "units=imperial";
var cityWeatherURL = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={individualAPIKey}";
const weatherImgUrl = 'http://openweathermap.org/img/wn/'; 
var userInput = $('#enter-city');
var historyContainer = $('.column2');
var cityInput = $('#log-city');
var forecast = $('#forecast');
var searchArr = loadHistory();
var inputHistory $('#input-history');
var oneCallOpenWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&appid={API key}";
// enb global variable declarations

// define functions
// define function to capitalize first letter of string
function titleCase(str) {
    var splitStr = str.toLowerCase().split(' ');
    for (var i = 0; i < splitStr.length; i++) {
        // Assign it back to the array
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
    }
    // Directly return the joined string
    return splitStr.join(' '); 
  }

// get cities from local storage

function loadHistory() {
    var loadHistoryArray = JSON.parse(localStorage.getItem('search history'));

    if(!loadHistoryArray) {
        loadHistoryArray = {
            cityHistory: [],
        };
    } else {
        // add search history to page
        for (var i = 0; i < loadHistoryArray.cityHistory.length; i++)
    }
}
