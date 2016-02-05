infobulle = new google.maps.InfoWindow({
    'position' : new google.maps.LatLng(0,0),           // position d'ancrage de l'InfoWindow sur la carte
    'content'  : '', // contenu qui sera affiché
    'visible': false,
  });
/*
 * crée une carte dans l'élément element, 
 * centrée sur la position position (x,y)
 * avec le zoom zoom
 * Roadmap = itinéraire
 */
map = null;
function creer_carte(element, lat, long, zoom) {
  map = new google.maps.Map(element, {
        'zoom': zoom,
        'center': new google.maps.LatLng(lat, long),
        'mapTypeId': google.maps.MapTypeId.ROADMAP
      });   
};
/*
 * crée un marqueur à la position position (x,y)
 * sur la carte map
 * le marqueur est l'image icon
 * 		définie par son url
 * 		et sa taille (largeur, hauteur)
 * au clic, on affiche l'infobulle associée
 */
function creer_pointeur(map, lat, long) {
	var largeur = 10;
	var hauteur = 10;
	var marker = new google.maps.Marker({
		  position: new google.maps.LatLng(lat, long), 
		  map: map,
		  //icon : {url: '', size:new google.maps.Size(largeur, hauteur)},
		  
		}); 
	google.maps.event.addListener(marker, 'click', function(data){
	    // affichage position du marker
	    //infobulle.setContent(contenu(marker));
	    infobulle.setPosition(new google.maps.LatLng(lat, long));
	    infobulle.open(map, marker);
	  }); 
};
function ajuster_taille() {
	//TODO : créer une fonction permettant d'ajuster le zoom aux points placés sur la carte
};
function calculer_tracer_itineraire(origine, destination) {
	var request = {
            'origin'      : origine,
            'destination' : destination,
            'travelMode'  : google.maps.DirectionsTravelMode.DRIVING // Type de transport
        }
        var directionsService = new google.maps.DirectionsService(); // Service de calcul d'itinéraire
        directionsService.route(request, function(response, status){ // Envoie de la requête pour calculer le parcours
            if(status == google.maps.DirectionsStatus.OK){
                direction.setDirections(response); // Trace l'itinéraire sur la carte et les différentes étapes du parcours
            }
        });
}

  // init lorsque la page est chargée
 google.maps.event.addDomListener( window, 'load', function(){
	 creer_carte(document.getElementById("div_carte"), 46.80, 1.70, 6);
	 //creer_pointeur(map, 46.80, 1.70);
 });
