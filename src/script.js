
const countryFlag    = `https://flagcdn.com/th.svg`
const inputValue     =  document.getElementById("input-value");
const formEvent      = document.getElementById("form");


//weather information
const countryName = document.getElementById("country-name");
const countryCode = document.getElementById("code");
const countryImg =  document.getElementById("country-img");
const degree     = document.getElementById("degree");
const condition  = document.getElementById("condition");
const weatherIcon = document.getElementById("weather-icon");

const humidity = document.getElementById("humidity");
const wind     = document.getElementById("wind");
const feel     = document.getElementById("feels"); 

console.log(degree)
const searchWeatherFunc = async (apiUrl)=>{
     try {
         const fetchAPI = await fetch(apiUrl);
         const resData  = await fetchAPI.json();
         setUpWeatherData(resData);
     }
     catch (err){
        return err.message;
     }
};
const setUpWeatherData = (data)=>{
     
    console.log(data);
    //weather title
     countryName.textContent = data?.name;
     countryCode.textContent = data.sys.country;
     countryImg.src =  `https://flagcdn.com/${data.sys.country.toLowerCase()}.svg`;
    
     //temperature celcius
     const tempCelsius = Math.round(data?.main?.temp - 273.15);
      degree.innerHTML = `${tempCelsius}&nbsp;&deg;C`;
      feel.innerHTML   = `${tempCelsius}&nbsp;&deg;C`;

     //weather information
     data?.weather?.map((items)=>{
         weatherIcon.src = ` https://openweathermap.org/img/wn/${items.icon}@4x.png`
         condition.textContent = items?.main
     })

     //other weather information
     wind.innerHTML  = `${Math.round(data?.wind?.gust)} km/h`;
     humidity.innerHTML = `${Math.round(data?.main?.humidity)} %`
}
formEvent.addEventListener("submit",(event)=>{
      event.preventDefault();
      const city  = inputValue.value.trim();
      if(city){
        const searchValueAPI = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=f5e2b2be217d43dfd912e2693a83535b`
        searchWeatherFunc(searchValueAPI)
      }
})
