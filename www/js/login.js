var form = document.querySelector("form");

form.addEventListener("submit", function(e){
    e.preventDefault();

    const usr = document.querySelector("[name=username]").value;
    const pwd = document.querySelector("[name=userpwd]").value;
    var url = form.action;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            for (const i of document.getElementsByClassName("response")) {
                i.remove();
            }
            var retour = document.createElement("p");
            retour.className = "response";
            var text = document.createTextNode(this.response);
            retour.appendChild(text);
            document.querySelector(".in-box-form").insertBefore(retour, form);
        }
    };
    xhttp.open("POST", url+"?username="+usr+"&userpwd="+pwd, true);
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhttp.send();
});