
let latitude;
let longitude;


function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}
function showPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude; 
  searchLocation(latitude + "," + longitude);


 

}  
getLocation() 
function searchFromInput() {
  let searchVal = document.getElementById("searchTxt").value;
  searchLocation(searchVal)
}
////////////////////////////////////////////////////////////////
function searchLocation(inputValue) {
  
  let reop = {
      method: 'GET'
  };
console.log(inputValue);
  fetch(`https://api.weatherapi.com/v1/forecast.json?key=f9ada6d13d7a4ae8851140240241103&q=${inputValue}&aqi=yes&alerts=yes  `, reop)
  
      .then(response => response.json())
      .then(data => {
          console.log(data);
          longitude = data["location"]["lon"] 
          latitude = data["location"]["lat"] 
          console.log(longitude);
          console.log(latitude);
          initializeMap(latitude,longitude);
          document.getElementById("weatherrealfeel").innerHTML = data["current"]["temp_f"] + "°F";
          document.getElementById("weatherhumidity").innerHTML = data["current"]["humidity"];
          document.getElementById("weatherwind").innerHTML = data["current"]["wind_kph"] + "kph";
          document.getElementById("weatherpressure").innerHTML = data["current"]["pressure_in"];

          
          document.getElementById("cel").innerHTML = data["current"]["temp_c"] + "°C";

          document.getElementById("textlbl").innerHTML = data["current"]["condition"]["text"];

          document.getElementById("countrylbl").innerHTML = data["location"]["name"];

          document.getElementById("img").src = data["current"]["condition"]["icon"];


          // 7 days outlook
          const startDate = new Date(`${data.forecast.forecastday[0].date}`);
            let currentDay = new Date(startDate);

            for (let i = 0; i < 7; i++) {
                //hethuw blann toISOString, split
                const formattedDate = currentDay.toISOString().split('T')[0];

                fetch(`https://api.weatherapi.com/v1/forecast.json?key=f9ada6d13d7a4ae8851140240241103&q=${inputValue}&days=7&dt=${formattedDate}&aqi=homagama&alerts=yes`)
                    .then(response => response.json())
                    .then(data => {
                     
                      document.getElementById(`d${i + 1}`).innerHTML =` ${data.forecast.forecastday[0].date}`;
                        document.getElementById(`temp${i + 1}`).innerHTML = `${data.forecast.forecastday[0].day.avgtemp_c} °C`;
                        document.getElementById(`iconF${i + 1}`).src = `${data.forecast.forecastday[0].day.condition.icon}`;
                        document.getElementById(`text${i + 1}`).innerHTML = `${data.forecast.forecastday[0].day.condition.text} `;
                        document.getElementById(`wind${i + 1}`).innerHTML = `${data.forecast.forecastday[0].day.maxwind_kph} kph `;





                  })
                  .catch(error => {
                      console.error("Error:", error);
                  });

              currentDay.setDate(currentDay.getDate() + 1);
          }
          // 3 days outlook

        
          const currentDays=new Date();
          currentDays.setDate(currentDays.getDate()-1);


          for (let i = 3; i >= 1; i--) {

            const formattedDates = currentDays.toLocaleDateString();

            fetch(`https://api.weatherapi.com/v1/history.json?key=f9ada6d13d7a4ae8851140240241103&q=${inputValue}&dt=${formattedDates}`)
                .then(response => response.json())
                .then(data => {
                  document.getElementById(`date${i}`).innerHTML = `${data.forecast.forecastday[0].date}`
                  document.getElementById(`templbl${i}`).innerHTML = `${data.forecast.forecastday[0].day.avgtemp_c} °C`;
                  document.getElementById(`iconFb${i}`).src = `${data.forecast.forecastday[0].day.condition.icon}`;
                  document.getElementById(`t${i}`).innerHTML = `${data.forecast.forecastday[0].day.condition.text}`;
                  document.getElementById(`w${i}`).innerHTML = `${data.forecast.forecastday[0].day.maxwind_kph} kph `;




                })
                .catch(error => {
                    console.error("Error:", error);
                });

            currentDays.setDate(currentDays.getDate() - 1);
        }
      (error => console.log("error", error));
});

};

//----------------------------------local time-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function updateLocalTime() {
    const localTimeElement = document.getElementById("local-time");
    const now = new Date();
    const localTimeString = now.toLocaleTimeString();
  
    localTimeElement.textContent = `${localTimeString}`;
  }
  
  updateLocalTime();
  
  setInterval(updateLocalTime, 1000);

// ----------------------------------local date-----------------------------------------------------------------------------

function updateLocalDate() {

    const localDateElement = document.getElementById("datelbl");
    const now = new Date();
    const localDateString = now.toLocaleDateString();
  
    localDateElement.textContent = `${localDateString}`;
  }
  
  updateLocalDate();
  
  setInterval(updateLocalDate, 1000);





/////////////////////////////   map   ////////////////////////////////
var map;
function initializeMap(latitude, longitude) {
  if (map) {

    map.remove();
}
    map = L.map('map').setView([latitude, longitude], 13); // Set initial coordinates and zoom level

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    var marker = L.marker([latitude, longitude]).addTo(map); // Add a marker at specified coordinates
}
  
//////////////////////////////dark mode//////////////////////////////////////////////////////
function darkMode() {
  var element = document.body;
  element.classList.toggle("dark-mode");
}




 



  
