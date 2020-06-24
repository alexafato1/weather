const searchElement = document.querySelector('[data-city-search]')
const searchBox = new google.maps.places.SearchBox(searchElement)
SearchBox.addListener('places_changed', () => {
    const place = search.getPlaces()[0]
    if(place== null) return
    const latitude = place.geometry.location.lat()
    const longitude = place.geometry.location.ing()
    fetch('/weather',{
       method:'POST',
       headers: {
           'Content-Type': 'application/json',
           'Accept': 'application/json'
       },
       body: JSON.stringify({
           latitude: latitude,
           longitude: longitude
       })
    }).then(res => res.json()).then(data => {
        setWeatherData(data, place.formatted_address)
    })
})