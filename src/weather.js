const API_KEY = "e23c541c6b8b955411e24bdc2fb0445c"



function onGeoOk(position){
    const lat = position.coords.latitude;
    const lng = position.coords.longitude;
    // console.log("You live in", lat, lng);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`;
    fetch(url)
        .then(response => response.json()
        .then(data => {
            const weather = document.querySelector("#weather span:first-child");
            const city = document.querySelector("#weather span:last-child");
            city.innerText = data.name;
            weather.innerText = `${data.weather[0].main} / ${data.main.temp}`;
        }));
};

function onGeoError(){
    alert("can't find you.")
}


navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);