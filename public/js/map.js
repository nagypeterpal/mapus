var map;
/*cr_nagypeter_l2_HxkGX426Sc0YATUAHOxE0QSE*/

$(document).ready(function () {
  //init map
  initMap();

  //staritn main llop
  var tid = setInterval(getLocation, 2000);
});

function initMap() {
  map = L.map("map").setView([51.505, -0.09], 13);
  const tiles = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {}
  ).addTo(map);

  function onMapClick(e) {
    const popup = L.popup()
      .setLatLng(e.latlng)
      .setContent(`You clicked the map at ${e.latlng.toString()}`)
      .openOn(map);
  }

  map.on("click", onMapClick);
}

function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

function showPosition(position) {
  const coord_lat = position.coords.latitude;
  const coord_long = position.coords.longitude;

  console.log(
    "mycoordinates datetime: " +
      Date.now() +
      " lat:" +
      coord_lat +
      " long: " +
      coord_long
  );

  const marker = L.marker([coord_lat, coord_long])
    .addTo(map)
    .bindPopup("I am here")
    .openPopup();
}
