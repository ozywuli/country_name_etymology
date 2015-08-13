L.mapbox.accessToken = 'pk.eyJ1IjoibXJvd2wiLCJhIjoiQW5seEFHVSJ9.fC2U7HkEIM-7EPNDMIoRXA';
var map = L.mapbox.map('map', 'mrowl.n5fegpje')
    .setView([0, 0], 2);


var copy;


$.getJSON('src/data/countries.geo.json', function(data) {

  var myLayer = L.mapbox.featureLayer().addTo(map);
  myLayer.setGeoJSON(data);



$.ajax({
    url: 'https://en.wikipedia.org/w/api.php?action=parse&prop=text&page=List_of_country-name_etymologies',
    data: {
        format: 'json'
    },
    dataType: 'jsonp'
}).done( function ( data ) {
    // console.log(data);
    // console.log(data.parse.text);
    // console.log(data.parse.text["*"]);

    copy = $(data.parse.text['*']);



    myLayer.eachLayer(function(layer) {


      layer.on('click', function(e) {
        console.log($(this)[0].feature.properties.name);


        var clickedCountry = '#' + $(this)[0].feature.properties.name;
        var clickedCountryName = $(this)[0].feature.properties.name;

        console.log('.' + clickedCountryName + '.modal__description');


        // $('.modals').append(
        //   '<div class="modal modal--revealed ' + clickedCountryName + '">'
        //   +  '<h2 class="modal__title"></h2>'
        //   +  '<p class="modal__description"></p>'
        //   +  '<p class="modal__learnmore"></p>'
        //   +  '</div>'
        // );


        // $('.' + clickedCountryName + ' .modal__description').append(copy.find(clickedCountry).parent().next().next());

        // if ( copy.find(clickedCountry).parent().next().hasClass('mainarticle') ) {
        //   $('.' + clickedCountryName + ' .modal__learnmore').append(copy.find(clickedCountry).parent().next());
        // }

        // $('.' + clickedCountryName + ' .modal__title').append(copy.find(clickedCountry));



        

        var wikiLink = 'https://en.wikipedia.org';


        copy.find('a').each(function() {
          var _href = $(this).attr("href"); 
          $(this).attr('href', wikiLink + _href );
          $(this).attr('target', '_blank');
        });



      });
      
    });







}); // end wiki ajax call











}); // end geojson



