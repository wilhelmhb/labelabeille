function _(el) {
	return document.getElementById(el);
}

if(window.addEventListener){
    window.addEventListener('load', debut, false);
}else{
    window.attachEvent('onload', debut);
}
var checkb=new Array();
var c=0;
var tr;
var time;
var page;
var page2;
var templates;
var enCharge=false;
var pagePrec=new Array();
var rucheSelect;
function debut(){
    new FastClick(document.body);
	
	page=_("pchargement");
 	masquerBd();
	_("btReglages").addEventListener("click",function(){transition(_("pparametres"),"");}); 
	var btsRetour = document.getElementsByClassName('retour');
	for(var i=0, l=btsRetour.length; i<l; i++){
	 btsRetour[i].addEventListener("click",function(){retour();}); 
	}
	_("btBd").addEventListener("click",masquerBd); 
	 $.get('templates.html', function(t) {
		 templates=t;
		 _("alveoles_chargement").addEventListener("click",function(){transition(_("pconnexion"),"fade");}); 
		 connect();
		 //_("check1").addEventListener("click", function(){check(1);});
		 //checkb[1]=true;
	 },'html');
}
function organiserRuches(nbRuches){
	h=_("ruche1").offsetHeight;
	w=_("ruche1").offsetWidth;
	for(i=2; i<=nbRuches; i++){
		_("ruche"+i).style.top=h*(0.76*(i-1))+'px';
		_("ruche"+i).style.left=w*(0.5*((i%2==0)?1:0))+'px';
	}
	for(i=1; i<=nbRuches; i++){
		_("ruche"+i).addEventListener("click",function(){
			if(!enCharge){
				rucheSelect=i;
				getDataHive(i,goToDataHives);
			}			
		});
		
	}
	
}
function parametresRuche(){
	transition(_("pparametres"),"");
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

function retour(){transition(null,"slideright");}
function transition(p2,mode,p1){
	var sousNav=false;
	var pOrigin;
	if(typeof p1 != 'undefined'){pOrigin=page;sousNav=true;page=p1;}
	if(c==0){
		if(!sousNav&&p2==null)page2=pagePrec.pop();
		else page2=p2;
		page2.style.display="block";
		if(mode=="fade"){
			page2.style.filter = 'alpha(opacity = 0)';
			page2.style.opacity = 0;
		}
		else if(mode=="slideright"){
			page2.style.right="100%";	
		}
		else {
			page2.style.right="-100%";	
		}
		time = new Date().getTime();
		tr = setInterval(function(){animerTransition(mode,(p2==null),sousNav,pOrigin)}, 1);
	}
}
function animerTransition(mode,retour,sousNav,pOrigin) {
	var t;
	if(mode=="fade")t=1000;
	else t=300;
	c=	(new Date().getTime() - time)/t*100;
	if(c<=100){
		if(mode=="fade"){
			page.style.filter = 'alpha(opacity = '+(100-c)/100+')';
			page.style.opacity = (100-c)/100;
			page2.style.filter = 'alpha(opacity = '+c/100+')';
			page2.style.opacity = c/100;
		}
		else if(mode=="slideright"){
			page.style.right=(-c)+"%";
			page2.style.right=(100-c)+"%";
		}
		else //PAR DEFAUT, SLIDE DE DROITE A GAUCHE
		{
			page.style.right=c+"%";
			page2.style.right=(-100+c)+"%";
		}
		c++;
	}else{
		if(mode=="fade"){
			page.style.filter = 'alpha(opacity = 0)';
			page.style.opacity = 0;
			page2.style.filter = 'alpha(opacity = 1)';
			page2.style.opacity = 1;
		}
		else if(mode=="slideright"){
			page.style.right="-100%";
			page2.style.right="0";
		}
		else {
			page.style.right="100%";
			page2.style.right="0";
		}
		page.style.display="none";
		if(!sousNav&&!retour)pagePrec.push(page);
		if(!sousNav)page=page2;
		if(sousNav)page=pOrigin;
		clearInterval(tr);
		c=0;
	}
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
            	console.log(data); 
            	//$("#result").html(data+'');
            	connexion_success();
            },
            error: function (xhr, ajaxOptions, thrownError) {
				enCharge=false;
                console.log('echec');
                console.log(xhr.responseText);
                connexion_failure();
                //$("#result").html(xhr.responseText);
            }
        });
}
/* récupération de la liste des ruches */
function getListHives(action) {
		enCharge=true;
        $.ajax({
            type: 'GET',
            url: url+'pscustomer/hives/me',
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
				enCharge=false;
                console.log(data); 
                //$("#resultat").html(JSON.stringify(data));
                action(data);
            },
        });
}
/* récupération des données d'une ruche */
function getDataHive(id, action) {
		enCharge=true;
        $.ajax({
            type: 'GET',
            url: url+'pscustomer/hives/'+id+'/me',
            dataType: "json",
            xhrFields: {
                withCredentials: true
            },
            success: function(data) {
				enCharge=false;
            	console.log(data); 
            	//$("#resultat").html(JSON.stringify(data));
            	action(data);
            }
        });
};

var url = 'http://api.label-abeille.org/app.php/';

/* fonction qui récupère et traite les données de connexion */
function connect() {
	$("#valider_connexion").on("click", function(){
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
	getListHives(goToListHives);
}
function goToListHives(listHives) {
    transition(_("paccueil"), "slide");
	var template = $(templates).filter('#tpl-accueil').html();
	listHives = {"ruches": listHives};
    var h = Mustache.render(template, listHives);
    document.getElementById("content-accueil").innerHTML = h;
	organiserRuches(2);
};
function goToDataHives(dataHive) {
	var template = $(templates).filter('#tpl-details').html();
  	var h = Mustache.render(template, dataHive);
    document.getElementById("details-content").innerHTML = h;
    transition(_("pdetails"), "");
	_("parametresRuche").addEventListener("click",parametresRuche); 
}