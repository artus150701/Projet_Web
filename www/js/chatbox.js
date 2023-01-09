$(document).ready(function(){
    var lastGetDate = new Date(0,0,0);
    getChat();

    $(".boutonChat").click(()=>{
        $(".chatbox").fadeToggle();
    });

    $(".boutonEnvoi").click(function(){
        $.post("htbin/chatsend.py",{msg:$(".entreeChat > input").val()},function(data, status){
            if (status=="success") {
                if (data.num==0) {
                    mynewchat = document.createElement("div");
                    mynewchat.className = "my-chat";
                    mynewchat.append(data.msg);
                    $(".chats").append(mynewchat);
                    $(".entreeChat > input").val("");
                    $(".error").remove();

                    getChat();
                }
                else{
                    $(".error").remove();
                    errorText = document.createElement("div");
                    errorText.className = "error";
                    errorText.append(data.msg);
                    $(".container-chatbox").append(errorText);
                }
            }
            else{
                $(".error").remove();
                errorText = document.createElement("div");
                errorText.className = "error";
                errorText.append("Erreur lors de l'envoi");
                $(".container-chatbox").append(errorText);
            }
        });
    });

    document.querySelector(".entreeChat > input").addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            $(".boutonEnvoi").click();
        }
    });

    function getChat(){
        $.post("htbin/chatget.py",{},function(data, status){
            if (status=="success") {
                for (const {date, time, user, msg} of data) {
                    msgDate = new Date( "20"+date.split("/")[2] + "-" + date.split("/")[1] + "-" + date.split("/")[0] + "T" + time + ":00");
                    if (msgDate >= lastGetDate && !isMsgAlready(date, time, user, msg)){
                        newchat = document.createElement("div");
                        newchat.className = "client-chat";
                        newchat.append("["+date + ", "+ time +"] "+user+" : "+msg);
                        $(".chats").append(newchat);
                    }
                }
                lastGetDate = new Date();
                lastGetDate.setSeconds(0,0);
            }
        });
    }

    function isMsgAlready(date, time, user, msg){
        for (const i of document.querySelectorAll(".client-chat")) {
            if (i.textContent == "["+date + ", "+ time +"] "+user+" : "+msg) {
                return true;
            }
        }
        return false;
    }

    chatUpdate = setInterval(getChat, 5000)
})