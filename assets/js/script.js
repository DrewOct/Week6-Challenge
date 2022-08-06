// declare global variables
var individualAPIKey = "332fae95efe25e7ea4d125202af903bc";
var unit = "units=imperial";
var cityWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";
const weatherImgUrl = "http://openweathermap.org/img/wn/";
var userInput = $("#enter-city");
var historyContainer = $(".column2");
var cityInput = $("#log-city");
var forecast = $("#forecast");
var searchArr = loadHistory();
var inputHistory = $("#input-history");
var currDay = moment().format('M/DD/YYYY');
var oneCallOpenWeatherUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=";
// enb global variable declarations

// define functions
// define function to capitalize first letter of string
function titleCase(str) {
  var splitStr = str.toLowerCase().split(" ");
  for (var i = 0; i < splitStr.length; i++) {
    // Assign it back to the array
    splitStr[i] =
      splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  // Directly return the joined string
  return splitStr.join(" ");
}

// get cities from local storage
function loadHistory() {
  var loadHistoryArray = JSON.parse(localStorage.getItem("search history"));

  if (!loadHistoryArray) {
    loadHistoryArray = {
      cityHistory: [],
    };
  } else {
    // add search history to page
    for (var i = 0; i < loadHistoryArray.cityHistory.length; i++) {
      searchArray(loadHistoryArray.cityHistory[i]);
    }
  }
  return loadHistoryArray;
}

// save to local storage
function saveLoadHistory() {
  localStorage.setItem("search history", JSON.stringify(searchArr));
}

// function to create search history and buttons
function searchArray(city) {
  var searchArrayBtn = $("<button>")
    .addClass("btn")
    .text(city)
    .on("click", function () {
      $("#current-conditions").remove();
      $("#forecast").empty();
      $("#forecastHeader").remove();
      getConditions(city);
    })
    .attr({
      type: "button",
    });
  //inputHistory.append(searchArr);
}

// function to retrieve weather data from api
function getConditions(city) {
  // api URL coordinates
  var cityCoordinatesUrl = cityWeatherURL + city + "&appid=" + individualAPIKey;
  console.log(cityCoordinatesUrl)

  // fetch coordinates for city

  fetch(cityCoordinatesUrl).then(function (coordinateReturn) {
    if (coordinateReturn.ok) {
        coordinateReturn.json().then(function (data) {
        console.log(data)
        var latitude = data.coord.lat;
        var longitude = data.coord.lon;
        // fetch weather information
        var apioneCallOpenWeatherUrl = oneCallOpenWeatherUrl + latitude + '&lon=' + longitude + '&appid=' + individualAPIKey + '&units=imperial';
        
        fetch(apioneCallOpenWeatherUrl).then(function (weatherReturn) {
            if (weatherReturn.ok) {
                console.log(weatherReturn);
                weatherReturn.json().then(function (getWeatherData) {

                    // start current weather 

                    // add div for information to be shown in current day
                    var currConditionsEl = $('<div>').attr({
                        id: 'current-conditions'
                    })

                    // weather icon for input city
                    var weatherImg = getWeatherData.current.weather[0].icon;
                    var cityCurrentWeatherImg = weatherImgUrl + weatherImg + '.png';

                    // create element to display city and current information
                    var currentHeadingEl = $('<h2>').text(city + '(' + currDay + ')');

                    // image for icon
                    var imageEl = $('<img>').attr({
                        id: 'current-conditions-icon',
                        src: cityCurrentWeatherImg,
                        alt: 'Weather Image',
                    })
                    
                    // unordered list of current weather data
                    var currWListEl = $('<ul>');

                    var currWData = ['Temp: ' + getWeatherData.current.temp + ' °F', 'Wind: ' + getWeatherData.current.wind_speed + ' MPH', 'Humidity: ' + getWeatherData.current.humidity + '%', 'UV Index: ' + getWeatherData.current.uvi];
                    
                    for (var i = 0; i < currWData.length; i++) {
                        // append individual list item to unorganized list

                        // create if condition to set background color to UV index to correspond to severity
                        if (currWData[i] === 'UV Index: ' + getWeatherData.current.uvi) {
                            var currWLi = $('<li>').text('UV Index: ')
                            currWListEl.append(currWLi);

                            var uvIndex = $('<span>').text(getWeatherData.current.uvi);

                            if (uvIndex.text() <= 2) {
                                uvIndex.addClass('favorable');
                            } else if (uvIndex.text() > 2 && uvIndex.text() <= 7) {
                                uvIndex.addClass('moderate');
                            } else {
                                uvIndex.addClass('severe');
                            }
                            currWLi.append(uvIndex);
                            // other list items
                        } else {
                            var currWLi = $('<li>').text(currWData[i])
                            // append li to ul
                            currWListEl.append(currWLi);
                        }
                }

                // append current weather div to column 2 above #forecast
                $('#forecast').before(currConditionsEl);
                // append current weather heading to above div
                currConditionsEl.append(currentHeadingEl);
                // append icon to above header
                currentHeadingEl.append(imageEl);
                // append ul to current weather div
                currConditionsEl.append(currWListEl);
                // document.body.append(currConditionsEl)

                // end current weather 

                // start 5-day forecast

                // header
                var forecastHeader = $('<h2>').text('5-Day Forecast:').attr({
                    id: 'five-day'
                });

                // append header to column 2 below current weather div
                $('#currConditionsEl').after(forecastHeader);

                // array for forecast
                var forecastArray = [];

                for (var i = 0; i < 5; i++) {
                    let forecastD = moment().add(i + 1, 'days').format('M/DD/YYYY');
                    forecastArray.push(forecastD);
                }

                // card for each date with weather details
                for (var i = 0; i < forecastArray.length; i++) {
                    // card divs
                    var forecastCard = $('<div>').addClass('column3');

                    // card structure
                    // body
                    var forecastCardBody = $('<div>').addClass('f-card-body');

                    // title
                    var forecastCardTitle = $('<h3>').addClass('f-card-title').text(forecastArray[i]);

                    // icon image for current weather
                    var fcIcon = getWeatherData.daily[i].weather[0].icon;

                    var fcIconEl = $('<img>').attr({
                        src: weatherImgUrl + fcIcon + '.png',
                        alt: 'Weather Image'
                    });

                    // weather details
                    var currWData = ['Temp: ' + getWeatherData.current.temp + ' °F', 'Wind: ' + getWeatherData.current.wind_speed + ' MPH', 'Humidity: ' + getWeatherData.current.humidity + '%', 'UV Index: ' + getWeatherData.current.uvi];
                    var tMp = $('<p>').addClass('fC-text').text('Temp: ' + getWeatherData.daily[i].temp.max);
                    var wNd = $('<p>').addClass('fC-text').text('Wind: ' + getWeatherData.daily[i].wind_speed + ' MPH');
                    var humidity = $('<p>').addClass('fC-text').text('Humidity: ' + getWeatherData.daily[i].humidity + '%');

                    // append forecastCard to forecast container
                    forecast.append(forecastCard);

                    // append forecastCardBody to forecastCard
                    forecastCard.append(forecastCardBody);

                    // append title to forecastCardBody
                    forecastCardBody.append(forecastCardTitle);

                    // append icon to forecastCardBody
                    forecastCardBody.append(fcIconEl);

                    // append temp data to forecastCardBody
                    forecastCardBody.append(tMp);

                    // append wind data to forecastCardBody
                    forecastCardBody.append(wNd);

                    // append humidity to forecastCardBody
                    forecastCardBody.append (humidity);
                }

                // end 5-day forecast
                })
            }
        })
      });
    //   conditional alert upon not finding details for city
    } else {
        alert('Error: Open Weather cannot locate city!')
    }
  })
//   if fetch fails
.catch (function(error) {
    alert("Cannot connect to Open Weather!")
});
}


// submit function to push elements from buttons
function submitHx(event) {
    event.preventDefault();
    console.log("test")

    //get value from user input
    var city = titleCase(cityInput.val().trim());

    //prevent them from searching for cities stored in local storage
    if (searchArr.cityHistory.includes(city)) {
        alert(city + ' is included in history below. Click the ' + city + ' button to get weather.');
        cityInput.val('');
    } else if (city) {
        getConditions(city);
        searchArray(city);
        //searchArr.cityHistory.push(city);
        saveLoadHistory();
        //empty the form text area
        cityInput.val('');
        
        //if user doesn't type in a city
    } else {
        alert('Please enter a city name!');
    }
}

// after submission of user data, fetch api data, get user input for city
userInput.on('submit', submitHx);

// event handler for clearing current display
$('#submit').on('click', function() {
    $('#current-conditions').remove();
    $('#forecast').empty();
    $('#forecastHeader').remove();
})