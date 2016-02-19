function _(el) {
	return document.getElementById(el);
}

if(window.addEventListener){
    window.addEventListener('load', debut, false);
}else{
    window.attachEvent('onload', debut);
}
var checkb=new Array();

function debut(){
	organiserRuches(7);
	//_("check1").addEventListener("click", function(){check(1);});
	//checkb[1]=true;
}

function organiserRuches(nbRuches){
	h=_("ruche1").offsetHeight;
	w=_("ruche1").offsetWidth;
	for(i=2; i<=nbRuches; i++){
		console.log(_("ruche"+i));
		_("ruche"+i).style.top=h*(0.76*(i-1))+'px';
		_("ruche"+i).style.left=w*(0.5*((i%2==0)?1:0))+'px';
	}
	
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
