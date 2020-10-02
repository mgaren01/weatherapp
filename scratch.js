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
    var input = document.getElementById('zip')

    input.addEventListener('keyup',function(e){
        if (e.keyCode === 13) {
        getWeather();
      }
    });

    
    //sets elements to be invisible before being populated
    document.getElementById('cityCard').style.visibility = "hidden"
    document.getElementById('tempKCard').style.visibility = "hidden"
    document.getElementById('tempCCard').style.visibility = "hidden"
    document.getElementById('tempFCard').style.visibility = "hidden"
    document.getElementById('imgCard').style.visibility = "hidden"
    document.getElementById('img').style.visibility = "hidden"
}


function getWeather() {
    zip = document.getElementById('zip').value //refers to html for input value of 'zip' element
    //make sure zip is valid before fetch
    //if validZip, run fetch
    var isValidZip = validateZipCode(zip) //establish isValidZip variable to compare against validateZipCode() function (line 53), which returns true or false
    
        if (isValidZip) { //if isValidZip returns as 'true', run fetch function
            fetch(api + zip + "&appid=" + key).then(function (response) {
                return response.json();
            }).then(function (data) {
                if (data.cod == '404') { //if bad zip, no data returns, so throw error message
                    alert(data.message)
                } else { //if good zip, display retrieved data
                    document.getElementById('cityCard').style.visibility = "initial"//makes city card visible
                    document.getElementById('city').innerHTML = data.name  //city name
                    document.getElementById('tempKCard').style.visibility = "initial"//kelvin card visible
                    document.getElementById('tempK').innerHTML = [Math.floor(data.main.temp)] + " K"; //temp in Kelvin
                    document.getElementById('tempCCard').style.visibility = "initial"//celsius visible
                    document.getElementById('tempC').innerHTML = [Math.floor(data.main.temp - 273.15)] + " C"; //temp Celsius
                    document.getElementById('tempFCard').style.visibility = "initial"//fahrenheit visible
                    document.getElementById('tempF').innerHTML = [Math.floor(data.main.temp - 273.15) * 9 / 5 + 32] + " F"; //temp Fahrenheit
                    document.getElementById('img').style.visibility = "initial"//img element visible
                    document.getElementById('imgCard').style.visibility = "initial"
                    document.getElementById('img').src = "http://openweathermap.org/img/wn/" + data.weather[0].icon + "@2x.png";
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
