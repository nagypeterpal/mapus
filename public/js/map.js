var map;
/*cr_nagypeter_l2_HxkGX426Sc0YATUAHOxE0QSE*/
$.ajaxSetup({
  beforeSend: function (xhr) {
    xhr.setRequestHeader(
      "Csrf-Token",
      $('meta[name="csrf-token"]').attr("content")
    );
  },
});

$(document).ready(function () {
  //init map
  initMap();

  //staritn main llop
  var tid = setInterval(mainloop, 5000);
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

function mainloop() {
  /*logging your location*/

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(handlePosition);
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

/*putting your marker on the screen*/
function handlePosition(position) {
  const coord_lat = position.coords.latitude;
  const coord_long = position.coords.longitude;

  /* getting server data of all users */
  $.ajax({
    url: "/getLocations",
    type: "POST",
    data: { lat: coord_lat, long: coord_long },
    dataType: "text",
    success: function (response, status, http) {
      console.log("AJAX worked!: ");
    },
  });

  console.log(
    "mycoordinates datetime: " +
      Date.now() +
      " lat:" +
      coord_lat +
      " long: " +
      coord_long
  );

  /*putting your marker on the screen*/
  const marker = L.marker([coord_lat, coord_long])
    .addTo(map)
    .bindPopup("I am here")
    .openPopup();
}
