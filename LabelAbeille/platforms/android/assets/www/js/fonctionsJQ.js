function getJSON(adresse) {
    $.ajax({
        type: 'GET',
        url: adresse,
        dataType: "json",
        success: function(data) {return data;},
    });
}   
function postJSON(adresse, donnees) {
    $.ajax({
        type: 'POST',
        url: adresse,
        data: donnees,
        dataType: "json",
        success: function(data) {return data;},
    });
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
/* recupere toutes les donnees concernant les ruches de l'utilisateur */
function recuperer_donnees_ruches(utilisateur) {
    var f = "BAT,DEF.DEF_BATTERIE_MIN,DEF.DEF_BATTERIE_MOY,DEF.DEF_COM,DEF.DEF_GEO,DEF.DEF_HUM_MAX,DEF.DEF_HUM_MIN,DEF.DEF_MASSE,DEF.DEF_ORI,DEF.DEF_POIDS_TARE,DEF.DEF_TEMP_MAX,DEF.DEF_TEMP_MIN,HORODATE,HUM,LAT,LNG,LUM,MASSE,MODE,ORI,PARAM.COMMENTAIRE,PARAM.NB_ABEILLE,PARAM.NB_HAUSSE,PARAM.POIDS_ESSAIM,PARAM.POIDS_RECOLTE,PARAM.POIDS_RUCHE_VIERGE,PARAM.PROD_MIEL_HAUSSE,PARAM.PROD_MIEL_RUCHE,PARAM.SEUIL_BAISSE_POIDS,PARAM.SEUIL_BAISSE_POIDS_DUREE,PARAM.SEUIL_BATTERIE_MIN,PARAM.SEUIL_BATTERIE_MOY,PARAM.SEUIL_HUMIDITE_MAX,PARAM.SEUIL_HUMIDITE_MIN,PARAM.SEUIL_TEMP_MAX,PARAM.SEUIL_TEMP_MIN,TMP,VOL";
    return getJSON('https://neotool.label-abeille.biz/kiwik/api?user=kiwik&pass=kiwik&method=getInfoRuche&idClient='+utilisateur+'&field='+f);
};
/* recupere et stocke localement toutes les donnees concernant les ruches de l'utilisateur */
function stocker_donnees_ruches(utilisateur) {
    sessionStorage['ruches'] = recuperer_donnees_ruches(utilisateur);
}
/* vérifie qu'une entrée de formulaire ne contient que des caractères autorisés, et entre 3 et 50 caractères */
function entree_valide_js(entree) {
    return entree.match('^[a-zA-Z0-9_]{3,50}$');
};
function traitement_connexion(login, mdp) {
    if (!entree_valide_js(login)) {
        /* afficher le message d'erreur */
        return false;
    }
    else {
        if (!entree_valide_js(mdp)) {
            /* afficher le message d'erreur */
            return false;
        }
        else {
            return postJSON('api.label-abeille.org/login_check', '_username='+login+'&_password='+mdp);
        }
    };
};
function traitement_modification_nom(nom) {
    if (!entree_valide_js(nom)) {
        /* afficher le message d'erreur */
        return false;
    }
    else {
        return postJSON('api.label-abeille.org/psclient/put/', 'name='+nom);
    }
};
function creer_ruche() {
    return postJSON('api.label-abeille.org/pshive/post/', 'name='+nom+'&id_box='+box);
}

