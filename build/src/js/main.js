L.mapbox.accessToken = 'pk.eyJ1IjoibXJvd2wiLCJhIjoiQW5seEFHVSJ9.fC2U7HkEIM-7EPNDMIoRXA';
var map = L.mapbox.map('map', 'mrowl.n5fegpje')
    .setView([38.89399, -77.03659], 17);

var featureGroup = L.featureGroup().addTo(map);

