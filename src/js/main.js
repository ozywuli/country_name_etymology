L.mapbox.accessToken = 'pk.eyJ1IjoibXJvd2wiLCJhIjoiQW5seEFHVSJ9.fC2U7HkEIM-7EPNDMIoRXA';
var map = L.mapbox.map('map', 'mrowl.n5fegpje')
    .setView([0, 0], 2);


var copy;


$.getJSON('src/data/countries.geo.json', function(data) {

  var myLayer = L.mapbox.featureLayer().addTo(map);
  myLayer.setGeoJSON(data);


  var geoJSON = data;



  // Handlebars
  var source = $("#modal-template").html();
  var template = Handlebars.compile(source);

Handlebars.registerHelper('countryName', function(properties) {
  return new Handlebars.SafeString(properties.name.replace(/\s|\.|\&/g, '_'));
});


  $('.modals').append(template(geoJSON));



$('#map').on('click', function(e) {

//  if ( !$('.leaflet-zoom-animated').is(e.target) )


  $('.modal').removeClass('modal--revealed');
});


$.ajax({
    url: 'https://en.wikipedia.org/w/api.php?action=parse&prop=text&page=List_of_country-name_etymologies',
    data: {
        format: 'json'
    },
    dataType: 'jsonp'
}).done( function ( data ) {


    copy = $(data.parse.text['*']);




        var wikiLink = 'https://en.wikipedia.org';


        copy.find('a').each(function() {
          var _href = $(this).attr("href"); 
          $(this).attr('href', wikiLink + _href );
          $(this).attr('target', '_blank');
        });



    myLayer.eachLayer(function(layer) {


      layer.on('click', function(e) {

        var clickedCountry = '#' + $(this)[0].feature.properties.name;
        var clickedCountryName = $(this)[0].feature.properties.name.replace(/\s|\.|\&/g, '_');
        var clickedCountryNameSliced = $(this)[0].feature.properties.name.replace(/\s|\.|\&/g, '_').slice(0, 10);

        console.log('.' + clickedCountryName);
        console.log('#' + clickedCountryName);


        $('.modal').removeClass('modal--revealed');

        $('.'+clickedCountryName).addClass('modal--revealed');


        console.log( copy.find('[id='+ clickedCountryNameSliced + ']') );


        $('.' + clickedCountryName + ' .modal__description').append( copy.find('[id^='+ clickedCountryNameSliced + ']').parent().nextAll('dl').first() );
       $('.' + clickedCountryName + ' .modal__learnmore').append( copy.find('[id^='+ clickedCountryNameSliced + ']').parent().next() );

        $('.' + clickedCountryName + ' .modal__title').append( copy.find('[id^='+ clickedCountryNameSliced + ']') );

      }); // end layer click
      
    }); // end myLayer eachLayer







}); // end wiki ajax call











}); // end geojson



