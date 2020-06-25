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
   // setWeatherData(data, place.formatted_address)
  })
})