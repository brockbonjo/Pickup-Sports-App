<main>
  <!-- forEach for all active pickups in sport -->
  <% pickup.forEach(function (p) { %>
  <a href="/show/<%= p._id %>">
  <div class="pickup">
    <div class="pickupMap">
      <% if (p.location == 'ZilkerPark') {%>
      <%= <img src="https://maps.googleapis.com/maps/api/staticmap?center=30.267340058514105,-97.76864196442546&zoom=12&size=300x200&key=AIzaSyBKZZSoBeHigMVBfIyGZHEZqqLPiGJkU38" alt=""> %>
      <% } else if (p.location == 'UT Fields') { %>
      <%= <img src="https://maps.googleapis.com/maps/api/staticmap?center=30.281161296200004,-97.7344150433724&zoom=12&size=300x200&key=AIzaSyBKZZSoBeHigMVBfIyGZHEZqqLPiGJkU38" alt=""> %>
      <% } else if (p.location == 'Onion Creek') { %>
      <%= <img src="https://maps.googleapis.com/maps/api/staticmap?center=30.176359699426296,-97.7419014190873&zoom=12&size=300x200&key=AIzaSyBKZZSoBeHigMVBfIyGZHEZqqLPiGJkU38" alt=""> %>
      <% } %>
    </div>
    <div class="timeStamp">
      Started: <%= p.createdAt %>
    </div>
    <div class="numPlayers">
      <span class="count">Players Joined: <%= p.numOriginalPlayers + p.rsvp.length %></span>
    </div>
  </div>
  </a>
  <% }) %>

</main>

zilker
https://maps.googleapis.com/maps/api/staticmap?center=30.267340058514105,-97.76864196442546&zoom=12&size=300x200&key=AIzaSyBKZZSoBeHigMVBfIyGZHEZqqLPiGJkU38
Onion Creek
https://maps.googleapis.com/maps/api/staticmap?center=30.176359699426296,-97.7419014190873&zoom=12&size=300x200&key=AIzaSyBKZZSoBeHigMVBfIyGZHEZqqLPiGJkU38
UT Fields
https://maps.googleapis.com/maps/api/staticmap?center=30.281161296200004,-97.7344150433724&zoom=12&size=300x200&key=AIzaSyBKZZSoBeHigMVBfIyGZHEZqqLPiGJkU38

<script>
    function initMap(){
      // Map options
      var options = {
        zoom:8,
        center:{lat:42.3601,lng:-71.0589}
      }

      // New map
      var map = new google.maps.Map(document.getElementById('map'), options);

      // Listen for click on map
      google.maps.event.addListener(map, 'click', function(event){
        // Add marker
        addMarker({coords:event.latLng});
      });

      /*
      // Add marker
      var marker = new google.maps.Marker({
        position:{lat:42.4668,lng:-70.9495},
        map:map,
        icon:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'
      });

      var infoWindow = new google.maps.InfoWindow({
        content:'<h1>Lynn MA</h1>'
      });

      marker.addListener('click', function(){
        infoWindow.open(map, marker);
      });
      */

      // Array of markers
      var markers = [
        {
          coords:{lat:42.4668,lng:-70.9495},
          iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
          content:'<h1>Lynn MA</h1>'
        },
        {
          coords:{lat:42.8584,lng:-70.9300},
          content:'<h1>Amesbury MA</h1>'
        },
        {
          coords:{lat:42.7762,lng:-71.0773}
        }
      ];

      // Loop through markers
      for(var i = 0;i < markers.length;i++){
        // Add marker
        addMarker(markers[i]);
      }

      // Add Marker Function
      function addMarker(props){
        var marker = new google.maps.Marker({
          position:props.coords,
          map:map,
          //icon:props.iconImage
        });

        // Check for customicon
        if(props.iconImage){
          // Set icon image
          marker.setIcon(props.iconImage);
        }

        // Check content
        if(props.content){
          var infoWindow = new google.maps.InfoWindow({
            content:props.content
          });

          marker.addListener('click', function(){
            infoWindow.open(map, marker);
          });
        }
      }
    }
</scipt>

    <script async="" defer="" src="https://maps.googleapis.com/maps/api/js?key=AIzaSyA372PcuJQKYrKADjhHTLLDVcfsoCzF-4M&amp;callback=initMap">
        </script>
