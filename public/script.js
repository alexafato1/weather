const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
searchBox.addListener('places_changed', () => {
  const place = searchBox.getPlaces()[0]
  if (place == null) return
  const lat = place.geometry.location.lat()
  const lon = place.geometry.location.lng()
  fetch('/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      lat: lat,
      lon: lon
    })
  }).then(res => res.json()).then(data => {
    console.log(data)
   setWeatherData(data, place.formatted_address)
  })
})

const locationElement = document.querySelector('[data-location]')
const statusElement = document.querySelector('[data-status]')
const temperatureElement = document.querySelector('[data-temperature]')
const precipitationElement = document.querySelector('[data-precipitation]')
const windElement = document.querySelector('[data-wind]')
let  icon = new Skycons ({ "color" : "pink" });
icon.set('icon', 'rain')
icon.play()



function setWeatherData(data, place){
  locationElement.textContent = place
  
  temperatureElement.textContent = (data.main.temp.toFixed(0)) 
  precipitationElement.textContent = data.weather[0].main
  windElement.textContent = data.wind.speed
  let  icon = new Skycons ({ "color" : "pink" });
  let weather = 'cloudly'
  if(data.weather[0].icon === '01d'){
    weather = 'clear-day'     
    icon =  new Skycons ({  'color': "pink"})
   }
   if( data.weather[0].icon === '01n'){
    weather = 'clear-night'     
    icon =  new Skycons ({  'color': "dark"})
   }
   if(data.weather[0].icon === '02n' ){
    weather = 'partly-cloudy-day'     
    icon =  new Skycons ({  'color': "#blue"})
   }
   if(data.weather[0].icon === '03n' || data.weather[0].icon === '03d'){
    weather = 'cloudy'     
    icon =  new Skycons ({  'color': "#666"})
   }
   if( data.weather[0].icon === '02d'){
    weather = 'partly-cloudy-night'     
    icon =  new Skycons ({  'color': "#666"})
   }
   if(data.weather[0].icon === '04n' || data.weather[0].icon === '04d'){
    weather = 'cloudy'     
    icon =  new Skycons ({  'color': "#666"})
   }
   if( data.weather[0].icon === '09d'){
    weather = 'showers-day'     
    icon =  new Skycons ({  'color': "#blue"})
   }
   if(data.weather[0].icon === '09n' ){
    weather = ' showers-night'     
    icon =  new Skycons ({  'color': "#blue"})
   }
   if( data.weather[0].icon === '10d' || data.weather[0].icon === '10n'){
    weather = 'rain'     
    icon =  new Skycons ({  'color': "#blue"})
   }
   if( data.weather[0].icon === '11d' || data.weather[0].icon === '11n'){
    weather = 'thunder'     
    icon =  new Skycons ({  'color': "#blue"})
   }
   if( data.weather[0].icon === '13d' || data.weather[0].icon === '13n'){
    weather = 'snow'     
    icon =  new Skycons ({  'color': "#blue"})
   }
   if( data.weather[0].icon === '50d' || data.weather[0].icon === '50n'){
    weather = 'fog'     
    icon =  new Skycons ({  'color': "#blue"})
   }
   statusElement.textContent = weather
  icon.set('icon', weather)
icon.play()
}