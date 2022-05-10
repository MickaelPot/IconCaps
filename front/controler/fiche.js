var img = document.getElementById("img");
var desc = document.getElementById("description");
var nft = JSON.parse(sessionStorage.getItem('nft'))

var prix = document.getElementById("prix"); // AJOUT
console.log(nft._id)

img.src = nft.nftSource;
desc.innerText = nft.name;
prix.innerText = "" + nft.price + "€"; // AJOUT
var p = document.createElement("p")
p.innerText = "Vendeur:"

var span = document.createElement("span")
span.id = "pseudo"
span.innerText = nft.ownerLogin

p.appendChild(span)
span = document.createElement("span")
span.id = "imageUser"
var icon = document.createElement("img")
icon.src = "../design/img/users/user2.jpg"  // ICON A MODIFIER STATIC
span.appendChild(icon)
p.appendChild(span)
desc.appendChild(p)

function chatConnexion() {
    if (!sessionStorage.getItem('login')) {
        window.location.href = "http://localhost/projetNode/front/view/connexion.html"
    } else {
        if (nft.ownerLogin !== sessionStorage.getItem('login')) {
            sessionStorage.setItem('chatLogin', nft.ownerLogin)
            window.location.href = "http://localhost/projetNode/front/view/chat.html"
        } else {
            alert("Vous ne pouvez pas vous envoyer un message a vous meme")
        }
    }

}

async function achat() {
    if (!sessionStorage.getItem('login')) {
        window.location.href = "http://localhost/projetNode/front/view/connexion.html"
    } else {
        if (nft.ownerLogin !== sessionStorage.getItem('login')) {
            axios.post("http://localhost:3000/changeNft", {
                ownerLogin: sessionStorage.getItem('login'),
                name: nft.name
            }).then(async (response) => {
                console.log(response);
                if (response.data.erreur) {
                    // Afficher erreur
                } else {

                    var today = new Date();
                    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                    var dateTime = date + ' ' + time;

                    var main = document.getElementById('main')
                    main.hidden = true;
                    var element = document.getElementById('pdf');
                    element.hidden = false;
                    var image = document.getElementById('nft');
                    image.src = nft.nftSource;
                    new QRCode(document.getElementById("qrcode"), ("Owner :" + sessionStorage.getItem('login') + " Date :" + dateTime));

                    test = await html2pdf(element);

                    window.location.href = 'http://localhost/projetNode/front/view/index.html'
                }
            })
        } else {
            alert("Vous etes deja propriétaire du nft")
        }
    }
}