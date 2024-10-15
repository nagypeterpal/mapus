//config
var map;
var lg;

$.ajaxSetup({
  beforeSend: function (xhr) {
    xhr.setRequestHeader(
      "Csrf-Token",
      $('meta[name="csrf-token"]').attr("content")
    );
  },
});

//when document ready
$(document).ready(function () {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by this browser.");
  } else {
    //init map
    navigator.geolocation.getCurrentPosition(initMap);

    //starting main loop
    var tid = setInterval(mainloop, 5000);
  }
});

//the init function
function initMap(position) {
  const coord_lat = position.coords.latitude;
  const coord_long = position.coords.longitude;

  map = L.map("map").setView([coord_lat, coord_long], 13);
  lg = L.layerGroup().addTo(map);

  const tiles = L.tileLayer(
    "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
    {}
  ).addTo(map);
}

function mainloop() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

/*putting your marker on the screen*/
function handlePosition(position) {
  //adjust the map to our position
  const coord_lat = position.coords.latitude;
  const coord_long = position.coords.longitude;

  //clear all markers
  lg.clearLayers();

  /* getting server data of all users */
  $.ajax({
    url: "/getLocations",
    type: "POST",
    data: { lat: coord_lat, long: coord_long },
    dataType: "json",
    success: function (result, status, http) {
      $.each(result.locations, function (key, value) {
        L.tooltip([value.lat, value.long], {
          content: "<p>" + value.name + "</p>",
        }).openOn(lg);
      });
    },
  });
}
