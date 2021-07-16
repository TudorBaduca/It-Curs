document.getElementById("button_1").addEventListener("click", function () {
  var city = document.getElementById("Input").value;

  let requestURL =
    "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=" + city;

  let request = new XMLHttpRequest();
  
  request.open("GET", requestURL);

  request.responseType = "json";
  request.send();

  request.onload = function () {
    var result = request.response;
    var m = result.weather[0].main;
    document.getElementById("Para-1").innerText = m;

    var h = result.main.humidity;
    document.getElementById("Para-2").innerText = h;

    var p = result.main.pressure;
    document.getElementById("Para-3").innerText = p;

    var t = result.main.temp;
    document.getElementById("Para-4").innerText = t;

    var tmin = result.main.temp_min;
    document.getElementById("Para-5").innerText = tmin;

    var tmax = result.main.temp_max;
    document.getElementById("Para-6").innerText = tmax;

    var img = result.weather[0].icon
    document.getElementById("Image").src = "http://openweathermap.org/img/wn/" + img + ".png"


  };
});
