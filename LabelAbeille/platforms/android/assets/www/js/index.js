function _(el) {
	return document.getElementById(el);
}

if(window.addEventListener){
    window.addEventListener('load', debut, false);
}else{
    window.attachEvent('onload', debut);
}
var checkb=new Array();
var tr;
var time;
var templates;
var enCharge=false;
var rucheSelect;
var tcharge;
var pcharge;
var slider;
var templateCharge=false;
var evtclick="click";


function debut(){
	dessinCercleFLAT(_("canvasProgressSimple"),0);
    new FastClick(document.body);
 	masquerBd();
	slider = new PageSlider($("#container"),$(_("pchargement")));
	//_("btReglages").addEventListener(evtclick,function(){transition(_("pparametres"),"");}); 		

	_("sitemobile").addEventListener(evtclick,function(){
		_("ch").style.visibility="visible";
		
		var ref=window.open('http://www.label-abeille.org', '_self');
		ref.addEventListener('loadstop', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loadstart', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('exit', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loaderror', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		
	});
	_("faq").addEventListener(evtclick,function(){
		_("ch").style.visibility="visible";
		
		var ref=window.open('http://www.label-abeille.org/faq', '_self');
		ref.addEventListener('loadstop', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loadstart', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('exit', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loaderror', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		
	});
	_("fb").addEventListener(evtclick,function(){
		_("ch").style.visibility="visible";
		
		var ref=window.open('https://www.facebook.com/Label-Abeille-679782012107769/?fref=ts', '_self');
		ref.addEventListener('loadstop', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loadstart', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('exit', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loaderror', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		
	});
	_("twitter").addEventListener(evtclick,function(){
		_("ch").style.visibility="visible";
		
		var ref=window.open('https://twitter.com/labelabeille', '_self');
		ref.addEventListener('loadstop', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loadstart', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('exit', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loaderror', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		
	});
	_("gplus").addEventListener(evtclick,function(){
		_("ch").style.visibility="visible";
		
		var ref=window.open('http://plus.google.com/share?url=https://www.label-abeille.org/fr', '_self');
		ref.addEventListener('loadstop', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loadstart', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('exit', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		ref.addEventListener('loaderror', function(event) { afficherBd(event.type+" - "+event.code+" - "+event.message,"OK"); } );
		
	});


	_("btCarte").addEventListener(evtclick, goToMap); 
	var btsRetour = document.getElementsByClassName('retour');
	for(var i=0, l=btsRetour.length; i<l; i++){
	 btsRetour[i].addEventListener(evtclick,function(){retour();}); 
	}
	_("btBd").addEventListener(evtclick,masquerBd);
	tcharge = setInterval(charger,20);
 	pcharge=0;
	$.get('templates.html', function(t) {
		 templates=t;
		 templateCharge=true;
	 },'html');
    /*templates='<meta http-equiv="Access-Control-Allow-Origin" content="*">'+
    '<script type="text/html" id="tpl-accueil">'+
    '<div id="sous_titre">'+
    '<span id="nav_gauche"></span>'+
    '<span id="nav_droite"></span>'+
    '<h1>Mon rucher</h1>'+
    '<div style="clear:both;"></div>'+
    '</div>'+
    '<div id="bas_defilement_gris"></div>'+
    '<div id="ruches">'+
    '{{#ruches}}'+
    '<div id="ruche{{idx}}" class="ruche_grise">'+
    '<div class="sizing"></div>'+
    '<h2>[{{idRuche}}]</h2>'+
    '<h1>{{nom}}</h1>'+
    '<div style="clear:left;"></div>'+
    '</div>'+
    '{{/ruches}}'+
    '</div>'+
    '<div style="clear:both;"></div>'+
    '</script>'+
    '<script type="text/html" id="tpl-details">'+
    '<div id="sous_titre">'+
    '<span id="nav_gauche"></span>'+
    '<span id="nav_droite"></span>'+
    '<h1>{{nom}} <span></span></h1>'+
    '</div>'+
    '<div id="details-content" class="contenu">'+
    '<div id="menudetails">'+
    '<img style="opacity:0.3;filter:alpha(opacity = 0.3)" src="img/details/courbes.png" alt="Courbes" />'+
    '<img style="opacity:0.3;filter:alpha(opacity = 0.3)" src="img/details/historique.png" class="milieu" alt="Historique" />'+
    '<img style="opacity:0.3;filter:alpha(opacity = 0.3)" id="parametresRuche" src="img/details/parametres.png" alt="Param&egrave;tres" />'+
    '</div>'+
    '<div id="details">'+
    '<div class="sizing"></div>'+
    '<div id="bloc1">'+
	'			<h1>Informations</h1>'+
	'			<p>Orientation : {{ori.v}}</p>'+
	'			<p>Capteur : reli&eacute;</p>'+
	'			<p>Rucher : 2.1</p>'+
    '</div>'+
    '<div id="bloc2">'+
	'			<h1>Miel</h1>'+
	'			<h2>Derni&egrave;re r&eacute;colte</h2>'+
	'			<p>{{recolte.v}}{{recolte.u}} le {{recolte.h}}</p>'+
	'			<p>Estimation miel : {{miel.v}}{{miel.u}}</p'+
    '</div'+
    '<div id="bloc3">'+
	'			<h1>Atmosph&egrave;re</h1>'+
	'			<p>Temp&eacute;rature : {{tmp.v}}{{tmp.u}}</p>'+
	'			<p>Humidit&eacute; : {{hum.v}}{{hum.u}}</p>'+
    '</div>'+
    '<div id="bloc4">'+
	'			<h1>Masse</h1>'+
	'			<p>Essaim : {{essaim.v}}{{essaim.u}}</p>'+
	'			<p>Ruche : {{masse.v}}{{masse.u}}</p>'+
    '</div>'+
    '</div>'+
    '</div>'+
    '</script>';
    templateCharge=true;*/
	 //_("check1").addEventListener(evtclick, function(){check(1);});
	 //checkb[1]=true;
}
function charger(){
 if(pcharge<100)pcharge++;
 dessinCercleFLAT(_("canvasProgressSimple"),pcharge);
 if(pcharge==100&&templateCharge){
	 transition(_("pconnexion"));
	 clearInterval(tcharge);
	 connect();
 }
}
function organiserRuches(nbRuches){
	console.log(nbRuches);
	var h,w;
	console.log(_("ruche1").offsetHeight);
	if(_("ruche1").offsetHeight != null) {
		console.log('ok');
		h = _("ruche1").offsetHeight;
	}
	else {
		console.log(_("ruche1").pixelHeight != null);
		if(_("ruche1").style.pixelHeight) {
			h = _("ruche1").style.pixelHeight;
		}
		else {
			console.log("ProblèmeH");
		}
	}
	console.log(_("ruche1").offsetWidth);
	if(_("ruche1").offsetWidth != null) {
		w = _("ruche1").offsetWidth;
	}
	else {
		console.log(_("ruche1").pixelWidth);
		if(_("ruche1").style.pixelWidth != null){
			w = _("ruche1").style.pixelWidth;
		}
		else {
			console.log("ProblèmeW");
		}
	}
	console.log(h+","+w);
	for(i=2; i<=nbRuches; i++){
		_("ruche"+i).style.top = h*(0.76*(i-1))+'px';
		_("ruche"+i).style.left = w*(0.5*((i%2==0)?1:0))+'px';
		console.log(_("ruche"+i).style);
	}
	for(i=1; i<=nbRuches; i++){
		_("ruche"+i).addEventListener(evtclick,function(){
			if(!enCharge){
				var k = this.getElementsByTagName("h2")[0].textContent;
				var n = this.getElementsByTagName("h1")[0].textContent;
				console.log(k);
				console.log(n)
				k = k.substring(1, k.length-1);
				console.log(k);
				rucheSelect=k;
				getDataHive(k, n, goToDataHives);
			}			
		});
	}
}
function parametresRuche(){
	//transition(_("pparametres"),"");
}
function check(n){
	if(checkb[n]){
		_("check"+n).src="img/off.png";
		checkb[n]=false;
	}
	else {
		 _("check"+n).src="img/on.png";	
		 checkb[n]=true;
	 }
}

function masquerBd() {
	_("bd").style.visibility="hidden";	
}
function afficherBd(mes,bt) {
	_("bd").style.visibility="visible";	
	_("messBd").innerHTML=mes;
	_("btBd_txt").innerHTML=bt;
}

function retour(){slider.slidePageFrom(null,"left");}
function transition(p2,mode,p1){
	console.log('transition : begin');
	slider.slidePageFrom(p2,"right");
	console.log('transition : end');
}
function PageSlider(container,pageinit) {

    var container = container,
        enTransition=false,
        currentPage=pageinit,
        hist = [];

    // Use this function directly if you want to control the sliding direction outside PageSlider
    this.slidePageFrom = function(dest, from) {
    	console.log('slidePageFrom : begin, enTransition='+enTransition);
        if(!enTransition){
        	console.log('slidePageFrom : isNotEnTransition');
	        enTransition=true;
			if(dest==null)dest=hist.pop();// si aucune destination n'est affichée, la destination est la dernière page visitée précedemment
			else{
				dest=$(dest);
				hist.push(currentPage);
			}
		
	        container.append(dest);
	
	        if (!currentPage || !from) {
	            dest.attr("class", "page center");
	            currentPage = dest;
	            return;
	        }
	
	        // Position the page at the starting position of the animation
	        dest.attr("class", "page " + from);
	
	        currentPage.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
	        	console.log('slidePageFrom : webkitTransitionEnd');
	                        enTransition=false;
	            $(e.target).remove();
				$("#pages").append(e.target);
	        });
	
	        // Force reflow. More information here: http://www.phpied.com/rendering-repaint-reflowrelayout-restyle/
	        container[0].offsetWidth;
	
	        // Position the new page and the current page at the ending position of their animation with a transition class indicating the duration of the animation
	        dest.attr("class", "page transition center");
	        currentPage.attr("class", "page transition " + (from === "left" ? "right" : "left"));
	        currentPage = dest;
        }
    	console.log('slidePageFrom : end, enTransition='+enTransition);
    };

}
function checkConnection() {
    var networkState = navigator.connection.type;

    var states = {};
    states[Connection.UNKNOWN]  = 'Unknown connection';
    states[Connection.ETHERNET] = 'Ethernet connection';
    states[Connection.WIFI]     = 'WiFi connection';
    states[Connection.CELL_2G]  = 'Cell 2G connection';
    states[Connection.CELL_3G]  = 'Cell 3G connection';
    states[Connection.CELL_4G]  = 'Cell 4G connection';
    states[Connection.CELL]     = 'Cell generic connection';
    states[Connection.NONE]     = 'No network connection';

    if(networkState == Connection.NONE) {
        alert("Nous n'avons détecté aucune connection Internet. Veuillez vous connecter avant de poursuivre.");
        return false;
    }
    else if (networkState == Connection.UNKNOWN) {
        alert("Votre connection Internet est incertaine. L'opération peut ne pas aboutir.");
    }
    return true;
}
/* non-implémenté côté serveur */
function creer_ruche() {
    //return postJSON('api.label-abeille.org/pshive/post/', 'name='+nom+'&id_box='+box);
}
/* connexion */
function connexion(user, passwd, success, failure) {
        console.log(user);
        console.log(passwd);
		enCharge=true;
		//$.support.cors = true;
		//$.mobile.allowCrossDomainPages = true;
		_("ch").style.visibility="visible";
		/*request = new XMLHttpRequest();
		request.open("GET", url+'login.html', true);
		
		request.onreadystatechange = function() {
			  console.log("** state = " + request.readyState);
			  if (request.readyState == 4) {
			      console.log("** status = " + request.status);
			      console.log(request.responseText);
			  }
		};

		request.send();*/
        $.ajax({
            type: 'POST',
            url: url+'login_check',
            //url: url+'test/connections',
            data: '_username='+user+'&_password='+passwd,
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
				enCharge=false;
				_("ch").style.visibility="hidden";
            	console.log(data); 
            	//$("#result").html(data+'');
            	success();
            },
            error: function (xhr, ajaxOptions, thrownError) {
				_("ch").style.visibility="hidden";
				enCharge=false;
                console.log('echec');
                console.log(xhr.responseText);
                console.log(ajaxOptions);
                failure();
                //$("#result").html(xhr.responseText);
            }
        });
}
/* récupération de la liste des ruches */
function getListHives(action) {
		enCharge=true;
		_("ch").style.visibility="visible";
        $.ajax({
            type: 'GET',
            url: url+'pscustomer/hives/me',
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
				enCharge=false;
				_("ch").style.visibility="hidden";
                console.log(JSON.stringify(data)); 
                //$("#resultat").html(JSON.stringify(data));
                action(data);
            },
        });
}
/* récupération des données d'une ruche */
function getDataHive(id, name, action) {
		enCharge=true;
		//$.support.cors = true;
		//$.mobile.allowCrossDomainPages = true;
		_("ch").style.visibility="visible";
        $.ajax({
            type: 'GET',
            url: url+'pscustomer/hives/'+id+'/me',
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
				enCharge=false;
				_("ch").style.visibility="hidden";
				console.log(id);
            	console.log(JSON.stringify(data)); 
				console.log(JSON.stringify(data["param.poids_essaim"])); 
            	//$("#resultat").html(JSON.stringify(data));
            	action(name, data);
            }
        });
};
function getHivesCoordinates(action) {
    $.ajax({
        type: 'GET',
        url: url+'pshive/hives/coordinates',
        dataType: "json",
        xhrFields: {
            withCredentials: true
        },
        success: function(data) {
        	console.log(JSON.stringify(data)); 
        	//$("#resultat").html(JSON.stringify(data));
        	action(data);
        }
    });
};
var url = 'https://api.label-abeille.org/';
/* fonction qui récupère et traite les données de connexion */
function connect() {
	$("#valider_connexion").on(evtclick, function(){
		if(!enCharge){
        	var user = encodeURIComponent($("#email_connexion").val());
        	console.log(user);
        	var login = encodeURIComponent($("#mdp_connexion").val());
        	console.log(login);
        	connexion(user, login, connexion_success, connexion_failure);
		}
    });
};
function connexion_failure() {
	afficherBd("Erreur de connexion","REESSAYER");
}
function connexion_success() {
	afficherBd("Vous êtes connecté. Vous allez être redirigé vers la liste de vos ruches dans quelques instants. Si ce n'est pas le cas, cliquez sur le bouton ci-dessous.", "Aller à la liste des ruches");
	getListHives(goToListHives);
	_("btBd").addEventListener(evtclick, function (){
		getListHives(
			function(listHives){
				console.log(listHives);
				enCharge=false;
				_("ch").style.visibility="hidden";
				var template = $(templates).filter('#tpl-accueil').html();
				var idx = 1;
				listHives = {
						"ruches": listHives,
					    "idx": function() {
					        return idx++;
					    }};
				console.log(listHives.ruches.length);
				console.log(JSON.stringify(listHives)); 
			    var h = Mustache.render(template, listHives);
			    console.log(h);
			    document.getElementById("content-accueil").innerHTML = h;
			    console.log(document.getElementById("paccueil").innerHTML);
			    organiserRuches(listHives.ruches.length);
			    console.log('goToListHives : befire transition');
			    _("container").innerHTML = "";
			    console.log(_("container").innerHTML);
			    $("#container").append(_("paccueil"));
			    masquerBd();
			    console.log('goToListHives : end');
			}
		);
	});
}
function goToListHives(listHives) {
	console.log('goToListHives : begin');
	var template = $(templates).filter('#tpl-accueil').html();
	var idx = 1;
	listHives = {
			"ruches": listHives,
		    "idx": function() {
		        return idx++;
		    }};
	console.log(listHives.ruches.length);
	console.log(JSON.stringify(listHives)); 
	console.log(listHives.ruches[0].name);
    var h = Mustache.render(template, listHives);
    console.log(h);
    document.getElementById("content-accueil").innerHTML = h;
    console.log(document.getElementById("paccueil").innerHTML);
    console.log('goToListHives : before transition');
    transition(_("paccueil"), "slide");
    organiserRuches(listHives.ruches.length);
    masquerBd();
    console.log('goToListHives : end');
};
function goToDataHives(name, dataHive) {
	var template = $(templates).filter('#tpl-details').html();
	dataHive.recolte = dataHive["param.poids_recolte"];
	dataHive.miel = dataHive["param.prod_miel_ruche"];
	dataHive.essaim = dataHive["param.poids_essaim"];
	dataHive.nom = name;
  	var h = Mustache.render(template, dataHive);
    document.getElementById("corps").innerHTML = h;
    transition(_("pdetails"), "");
	//_("parametresRuche").addEventListener(evtclick,parametresRuche); 
}
function goToMap() {
	console.log("goToMap");
	getHivesCoordinates(initializeMap);
	transition(_("pmap"), "");
}
function dessinCercleFLAT(cible,pourcentage){
 var dateActu = new Date();
 timeActu= dateActu.getTime();
 
 var bg = cible;
 var ctx = bg.getContext('2d');
 // netoyage du canvas existant
 var w = _("alveoles_chargement").width;
 var h = _("alveoles_chargement").offsetHeight;
 var cote = w/3;
 _("canvasProgressSimple").width=_("canvasProgressSimple").height=cote+2;
 _("canvasProgressSimple").style.top=(20 + h/2 - cote/2)+'px';
 _("canvasProgressSimple").style.left='calc(50% - '+cote/2+'px)';
 ctx.clearRect ( 0 , 0 , cote , cote );
 // definition d'un cercle complet
 var circ = Math.PI * 2;
 var quart = Math.PI / 2;
 
 // creation d'un cercle de progression
 var ctx = ctx = bg.getContext('2d');
 ctx.strokeStyle = '#e1ffbc';
 ctx.lineWidth = cote/7;
 ctx.beginPath();
 ctx.arc(cote/2, cote/2, cote/2-ctx.lineWidth/2, 0, circ, false);
 ctx.stroke();
 
 // creation d'un cercle de progression
 var ctx = ctx = bg.getContext('2d');
 ctx.strokeStyle = '#99e144';
 ctx.lineWidth = cote/7;
 ctx.beginPath();
 ctx.shadowOffsetY = 0;
 ctx.arc(cote/2, cote/2, cote/2-ctx.lineWidth/2, -(quart), ((circ) * pourcentage/100) - quart, false);
 ctx.stroke();
 
 ctx.font = "bold "+(cote/8)+"pt Calibri,Geneva,Arial";
 ctx.textAlign = 'center';
 ctx.fillStyle = "#000000";
 ctx.fillText(pourcentage+'%', cote/2, cote/2+cote/20);
 ctx.shadowBlur = 0; 

};
function initializeMap(hiveCoordinates) {
	/* definition of the global variables */
    var markers, map, index = 0, zoneMarkers;
    zoneMarkers = new google.maps.LatLngBounds();
    console.log("initializeMap");
    /** create and place a marker on a map
     * @int n: index our the created marker
     * @map map: map where the marker will be placed
     * @float lat, long: coordinates of the marker on the map
     * @string url: url of the marker's image
     * @int height, width: size of the marker
     * @int originX, originY: placement of the marker's image in the layout
     * @int anchorX, anchorY: placement of the marker relative to the coordinates
     * @int scaleX, @scaleY: scaled size of the marker's image
     * @boolean optimized: true if all the markers have to be united in one graphic (better for time complexity, worse for resolution)
     * @string title: message to show onmouseover
     * @string content: content of the InfoWindow displayed on click, if empty, no InfoWindow
     * @function action: function to call on click in addition to the InfoWindow
     */
    function createMarker(n, map, lat, long, url) {
        var icon = {url: url}; // intanciate the icon
        
        /* instanciate the marker itself */
        var marker = {
            position: new google.maps.LatLng(lat, long), 
	        map: map,
	        icon : icon
        }
        /* transform our marker into a google maps marker */
	    var marker = new google.maps.Marker(marker); 
	    
	    /* if content has been defined, create an InfoWindow that will pop-up on click */
	    /*if(content != '') {
	        /* attach the infoWindow to the marker */
    	    /*marker.infobulle = new google.maps.InfoWindow({
                content  : content, // contenu qui sera affiché
                visible: false,
                position: new google.maps.LatLng(lat, long),
                maxWidth: 500
            });
        
	        google.maps.event.addListener(marker, 'click', function addInfoWindow(data){
	            // affichage position du marker
	            console.log(content);
	            marker.infobulle.open(map, marker);
	        });
        }*/
	    /* the index wil be useful in case of removal of the marker's childs and roads */
	    marker.index = n;
        /* add marker to the zone */
        zoneMarkers.extend(marker.getPosition());
        map.fitBounds(zoneMarkers);
	    return marker;
    };
    
    /** create and display a map 
     * @DOMNode element: the element were to display the map
     * @float lat, long: coordinates of the center of the map
     * @int zoom: zoom on the map
     * @google.maps.MapTypeId type: type of map
     */
    function createMap(element, lat, long, zoom) {
        map = new google.maps.Map(element, {
            'zoom': zoom,
            'center': new google.maps.LatLng(lat, long)
        });
    };
    
    /** 
     * display all wished elements on the map, and handle their behaviour
     */
    function displayElements() {
        createMap(document.getElementById("corps_carte"), 48.513202, 7.081958, 6);
	    console.log(map);
	    
        if(markers != null && markers.length > 0) {
            console.log(markers);
            for(var k = 0; k < markers.length; k++) {
                markers[k].setMap(null);
                delete markers[k];
            }
        }
        
        /* reset all constants of the map */
        index = 0;
        markers = new Array();
        
	    for(var i = 0; i < hiveCoordinates.length; i++) {
	    	console.log(JSON.stringify(hiveCoordinates[i]));
	        if(hiveCoordinates[i] != null && (hiveCoordinates[i].lat != '0.00000000' || hiveCoordinates[i].lng != '0.00000000')) {
	            markers[index] = createMarker(index, map, hiveCoordinates[i].lat, hiveCoordinates[i].lng, "http://www.label-abeille.org/modules/cmaps/views/img/markers/yellow_pin.png");
		        index++;
	        }
	    }
	};
	
	displayElements();
}
