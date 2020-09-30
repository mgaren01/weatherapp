//establish initial variables
var zip = 40515
var api = 'https://api.openweathermap.org/data/2.5/weather?zip='
var key = 'ee409640357e755d7a5acf70455e5f95'
var city = document.getElementById('city')
var tempK = document.getElementById('tempK')
var tempC = document.getElementById('tempC')
var tempF = document.getElementById('tempF')
var icon= document.getElementById('icon')

var data = null

//
function init() {
    // zip = zip
    // api = api
    // key = key
    // city = city.innerHTML
    // tempK = tempK.innerHTML
    // tempC = tempC.innerHTML
    // tempF = tempF.innerHTML
    // icon = icon.innerHTML
    document.getElementById('button').addEventListener('click', getWeather);  //links to html, adds event listener to button
}

function getWeather() {
    zip = document.getElementById('zip').value //refers to html for input value of 'zip' element
    //make sure zip is valid before fetch
    //if validZip, run fetch
    var isValidZip = validateZipCode(zip) //establish isValidZip variable to compare against validateZipCode() function (line 53), which returns true or false
    
        if (isValidZip) { //if isValidZip returns as 'true', run fetch function
            fetch(api + zip + "&appid=" + key).then(function (response) {
                return response.json();
            }).then(function (json) {
                console.log(json)
                data = json //sets data (null, set on line 11) equal to returned json data
                if (data.cod == '404') { //if bad zip, no data returns, so throw error message
                    alert(data.message)
                } else { //if good zip, display retrieved data
                    document.getElementById('city').innerHTML = data.name  //city name
                    document.getElementById('tempK').innerHTML = data.main.temp + "K"; //temp in Kelvin
                    document.getElementById('tempC').innerHTML = data.main.temp - 273.15 + "C"; //temp Celsius
                    document.getElementById('tempF').innerHTML = (data.main.temp - 273.15) * 9 / 5 + 32 + "F"; //temp Fahrenheit
                }
            })
        } else { //if isValidZip returns 'false', throw alert
            alert('invalid Zip');
        }
}

function validateZipCode(elementValue){
    var zipCodePattern = /^\d{5}$|^\d{5}-\d{4}$/;
     return zipCodePattern.test(elementValue);
}
