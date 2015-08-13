// L.mapbox.accessToken = 'pk.eyJ1IjoibXJvd2wiLCJhIjoiQW5seEFHVSJ9.fC2U7HkEIM-7EPNDMIoRXA';
// var map = L.mapbox.map('map', 'mrowl.n5fegpje')
//     .setView([0, 0], 2);


// $.getJSON('src/data/countries.geo.json', function(data) {

//   var myLayer = L.mapbox.featureLayer().addTo(map);
//   myLayer.setGeoJSON(data);

//   myLayer.eachLayer(function(layer) {


//     layer.on('click', function(e) {
//       console.log($(this)[0].feature.properties.name);
//     })
    
//   });

// }); 



$.ajax({
    url: 'https://en.wikipedia.org/w/api.php?action=parse&prop=text&page=List_of_country-name_etymologies',
    data: {
        format: 'json'
    },
    dataType: 'jsonp'
}).done( function ( data ) {
    console.log(data);
    console.log(data.parse.text);
    console.log(data.parse.text["*"]);

    $('.data').append(data.parse.text["*"]);
} );