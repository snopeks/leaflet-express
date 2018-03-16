var mymap;
$(function(){
  console.log("ready!");
  var sf = L.marker([37.7749, -122.4194]).bindPopup("<b>Current City</b><br> It's nice in california")
  var vancouver = L.marker([49.28, -123.12]).bindPopup("<b>Home City!</b><br>Vancouver is awesome.")
  var puerto = L.marker([15.8720, -97.0767]).bindPopup("<b>Fil and Sara!</b><br> We miss them");
  var paris = L.marker([48.8566, 2.3522]).bindPopup("<b>Paris! The best bread ever</b><br> we should go back");
  var asheville = L.marker([35.5951, -82.5515]).bindPopup("<b>A recommended city</b>")
  var amsterdam = L.marker([52.3702, 4.8952]).bindPopup("<b>Amazing canals</b>")
  var cities = L.layerGroup([sf, vancouver,puerto, paris, asheville, amsterdam])
  // .addTo(mymap);
  var baseLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RlcGhzbm9wZWsiLCJhIjoiY2plaGg1OXY4MGF0NjJ3bmxwNXZiY3VoayJ9.nDLlDzAz5UZYZH0I5SYSpA', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    id: 'mapbox.streets'
  })
  var secondLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RlcGhzbm9wZWsiLCJhIjoiY2plaGg1OXY4MGF0NjJ3bmxwNXZiY3VoayJ9.nDLlDzAz5UZYZH0I5SYSpA', {
    id: 'mapbox.streets-satellite'
  })
  var thirdLayer = L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoic3RlcGhzbm9wZWsiLCJhIjoiY2plaGg1OXY4MGF0NjJ3bmxwNXZiY3VoayJ9.nDLlDzAz5UZYZH0I5SYSpA', {
    id: 'mapbox.comic'
  })

  mymap = L.map('mapid', {
      center: [49.28, -123.12],
      zoom: 13,
      layers: [baseLayer, cities]
  })
  var baseMaps = {
    "Street Maps": baseLayer,
    "Satellite": secondLayer,
    "Comic": thirdLayer
  }
  var overlayMaps = {
    "Cities": cities
  }
  L.control.layers(baseMaps, overlayMaps).addTo(mymap)



    // mymap.panTo([37.7749, -122.4194])
  var circle = L.circle([49.28, -123.12], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 500
}).addTo(mymap);
var polygon = L.polygon([
    [49.287, -123.12],
    [49.287, -123.11],
    [49.284, -123.11]
]).addTo(mymap);
circle.bindPopup("I am a circle.");
polygon.bindPopup("I am a polygon.");
var popup = L.popup();
function onMapClick(e) {
  popup
      .setLatLng(e.latlng)
      .setContent("You clicked the map at " + e.latlng.toString())
      .openOn(mymap);
    console.log(e)
}

$("#searchQuery").on('submit', function(e){
  e.preventDefault();
  var searchQuery = $(this).serialize();
  var searchTerm = $("#searchTerm").val()
  console.log(searchTerm)
  $.ajax({
    method: "GET",
    data: searchQuery,
    url: `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchQuery}.json?access_token=pk.eyJ1Ijoic3RlcGhzbm9wZWsiLCJhIjoiY2plaGg1OXY4MGF0NjJ3bmxwNXZiY3VoayJ9.nDLlDzAz5UZYZH0I5SYSpA`,
    success: handleSearchSuccess,
    error: handleSearchError
  })
  $("#searchTerm").val('')
  $("#searchNotice").empty();
  $("#mapData").empty();

  $("#searchNotice").append(`<h3>You searched for: ${searchTerm}</h3>`);


})

mymap.on('click', onMapClick);
}) // end of onReady

function handleSearchSuccess(response){
  console.log(response)
  var placeName = response.features[0].place_name
  var lng = response.features[0].geometry.coordinates[0]
  var lat = response.features[0].geometry.coordinates[1]
  console.log(lat, lng)
  var searchLocation = null;
  searchLocation = L.marker([lat, lng]).addTo(mymap)
  searchLocation.bindPopup(`<b>${placeName}</b><br>Lat: ${lat}, Lng: ${lng}`)
  mymap.panTo([lat, lng])
  $("#mapData").append(`<p>Top match: ${response.features[0].place_name}<p>coordinates: ${response.features[0].geometry.coordinates}</p>`)
}
function handleSearchError(err){
  console.log('there was an error!', err)
}