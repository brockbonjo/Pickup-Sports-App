<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJPsnFimaA4YhK6htIku8Cz0gM10FtA1I&callback=initMap">
<script id="map" type="text/javascript">
  function initMap() {
    var options = {
      zoom: 8,
      center: {lat: 30.2672, lng:-97.7431}
    }

    var map = new google.maps.Map(document.getElementById('map'), options);

    google.maps.event.addListener(map, 'click', function(event){
      addMarker({coords:event.latLng});

    });

    var markers = [
      {
        coords: {lat: 30.267490630430462, lng: -97.76876091957092 },
        content: '<h2> Zilker Park Great Field</h2>'
      },
      {
        coords: {lat: 30.17627525018336, lng: -97.74337626739577 },
        content: '<h2>Onion Creek Soccer Complex</h2>'
      },
      {
        coords: {lat: 30.28123286605467, lng: -97.73457361095086 },
        content: '<h2>UT Campbell Fields</h2>'
      }
    ];

    for(var i = 0: i < markers.length; i++) {
      addMarker(markers[i]);
    }

    function addMarker(props) {
      var marker = new google.maps.Marker({
        position: props.coords,
        map: map,
      });
      if(props.content){
        var infoWindow = new google.maps.InfoWindow({
         content: props.content
       });

       marker.addListener('click', function() {
         infoWindow.open(map, marker);
       });
      }
    }
  }
}
// addMarker({coords: {lat: 30.2672, lng:-97.7431},
//   content: '<h1>Austin, TX</h1>'
// }
</script>


</script>
