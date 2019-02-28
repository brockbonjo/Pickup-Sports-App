<script id="map" type="text/javascript">
  function initMap(){
    var options = {
      zoom: 8,
      center: {lat: 30.2672, lng:97.7431}
    }
    var map = new google.maps.Map(document.getElementById('map'), options);

    function addMarker (props) {
      var marker = new google.maps.Marker({
        position: props.coords,
        map: map,
        content: '<h1>Austin, TX</h1>'
      });
      if(props.content){
        var infoWindow = new google.maps.InfoWindow({
         content: props.content
       });

       marker.addListener('click', function() {
         infoWindow.open(map, marker);
       // })
      }



    });
    // var marker = new google.maps.Marker({
    //   position:
    //   map: map,
    //
    // })
    //
  }
addMarker({coords: {lat: 30.2672, lng:-97.7431},
  content: '<h1>Austin, TX</h1>'
}
</script>

<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCJPsnFimaA4YhK6htIku8Cz0gM10FtA1I&callback=initMap"
  async defer></script>
