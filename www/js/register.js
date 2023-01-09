document.getElementById("date").addEventListener("input", function() {
    var paragrapheErreur = document.getElementById("e_birthdate");

    if (this.value.charAt(2) != '/' | this.value.charAt(5) != '/') {
	    paragrapheErreur.innerHTML = "La date n'est pas bonne écrivez une date du type jj/mm/aaaa";
    }
    else{
	    var valeur = this.value.split("/");
	    paragrapheErreur.style.color = "red";
	    if (valeur[0] < 0 | valeur[0] > 31) {
	        paragrapheErreur.innerHTML = "Ce jour n'existe pas";
	    }
	    else if (valeur[1] < 0 | valeur[1] > 12) {
	        paragrapheErreur.innerHTML = "Ce mois n'existe pas";
	    }
	    else if (valeur[2] < 1800 | valeur[2] > 2050) {
	        paragrapheErreur.innerHTML = "Cette année est non valide";
	    }
	    else{
	    paragrapheErreur.innerHTML = "";
        document.getElementById("erreur").innerHTML ="";
        }
    }
})


document.getElementById("mdp").addEventListener("input", function() {
    var msg;
    var str = this.value;
    var decimal=  /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (str.match(decimal)){
	    msg = "";
        document.getElementById("erreur").innerHTML ="";
    }
    else{
	    msg = "Mot de passe pas assez fort";
    }
    document.getElementById("e_password").innerHTML= msg;
})

document.getElementById("email").addEventListener("input", function() {
    var msg;
    var str = this.value;
    var decimal= /^([\w-\.]+)@((?:[\w]+\.)+)([a-zA-Z]{2,4})/i;
    if (str.match(decimal)){
	    msg = "";
	    document.getElementById("mail").style.color = "green";
        document.getElementById("erreur").innerHTML ="";
    }
    else{
	    msg = "Email pas correct";
	    document.getElementById("mail").style.color = "red";
    }
    document.getElementById("mail").innerHTML= msg;
})

document.getElementById("pseudo").addEventListener("input", function() {
    var msg;
    var str = this.value;
    if (str.length < 6 ){
	    document.getElementById("pseudo").className = "false";
	    msg = "Nom utilisateur trop court";
	    document.getElementById("e_username").style.color = "red";
    }
    else{
	    msg = "";
        document.getElementById("erreur").innerHTML ="";
    }
    document.getElementById("e_username").innerHTML= msg;
})

document.forms["inscription"].addEventListener("submit", function(e) {
    var erreur;
    var er_mail = document.getElementById("mail").textContent;
    var er_psw = document.getElementById("e_password").textContent;
    var er_pseudo = document.getElementById("e_username").textContent;
    var er_date = document.getElementById("e_birthdate").textContent;

    var nom = document.getElementById("nom").value;
    var prenom = document.getElementById("prenom").value;
    var date = document.getElementById("date").value;
    var pseudo = document.getElementById("pseudo").value;
    var mdp = document.getElementById("mdp").value;
    var email = document.getElementById("email").value;




    if (!(er_mail === "" &&  er_psw === "" && er_pseudo === "" && er_date === "" && !(nom==="") && !(prenom==="") &&!(date==="") &&!(pseudo==="") &&!(mdp==="") &&!(email===""))) {
	    e.preventDefault();
	    document.getElementById("erreur").style.color = "red";
        if ((nom==="") || (prenom==="") || (date==="") ||  (pseudo==="") ||  (mdp==="") || (email==="")){
            document.getElementById("erreur").innerHTML ="Champs vide " +er_mail +er_psw + er_pseudo + er_date; ;
        }
        else{	document.getElementById("erreur").innerHTML ="Problème type:"  +er_mail +er_psw + er_pseudo + er_date;}

    }
    else{
	    alert('Formulaire envoyé');
	    document.getElementById("erreur").innerHTML = "";
	    this.submit();
    }
});
