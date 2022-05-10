const cheminNodeJS = "http://localhost:3000/message";


document.getElementById("pseudoUser").textContent = sessionStorage.getItem("chatLogin")
var socket = io('http://localhost:3001');
var message = document.getElementById("message")
var chat = document.getElementById("chat")


let options = {
    method: 'POST',
    url: "http://localhost:3000/getMessage",
    params: {
        sender: sessionStorage.getItem('login'),
        receiver: sessionStorage.getItem('chatLogin'),
    }
}

axios.request(options).then((response) => {
    console.log(response);
    if(response.data.erreur){
        // Afficher erreur
    } else {
        response.data.forEach(
            element => {
                var innerDiv = document.createElement('div');
                var text = document.createElement('p');
                if(element.sender === sessionStorage.getItem('login')){
                    innerDiv.className = 'messageMe';
                } else {
                    innerDiv.className = 'messageUser';
                }
                text.textContent = element.message
                innerDiv.appendChild(text);
                chat.appendChild(innerDiv);
            })
    }
}).catch((error) => {
    console.log(error)
})


function send(){
    let options = {
        method: 'POST',
        url: cheminNodeJS,
        params: {
            sender: sessionStorage.getItem('login'),
            receiver: sessionStorage.getItem('chatLogin'),
            message: message.value
        }
    }

    axios.request(options).then((response) => {
        console.log(response);
        if(response.data.erreur){
            // Afficher erreur
        } else {
            socket.emit('chat message', message.value, sessionStorage.getItem('login'), sessionStorage.getItem('chatLogin'));
            message.value = '';
        }
    }).catch((error) => {
        console.log(error)
    })
}
socket.on('chat message', function(msg,login,to) {
    console.log("recu")
    console.log(sessionStorage.getItem("login") + " : "+login+" : "+to)
    if((sessionStorage.getItem("login") === login || sessionStorage.getItem("login") === to)
        && (sessionStorage.getItem("chatLogin") === login || sessionStorage.getItem("chatLogin") === to)){
        var innerDiv = document.createElement('div');
        var text = document.createElement('p');
        if(login === sessionStorage.getItem('login')){
            innerDiv.className = 'messageMe';
        } else {
            innerDiv.className = 'messageUser';
        }
        text.textContent = msg
        innerDiv.appendChild(text);
        chat.appendChild(innerDiv);
        window.scrollTo(0, document.body.scrollHeight);


    }
});