//const painterro = document.getElementById("paintero");

var price = document.getElementById("prix");
var ownerLogin = sessionStorage.getItem('login');
var nftSource = null;

var ptro = Painterro({
    activeColor: '#000000',
    saveHandler: function (image) {
        nftSource = image.asDataURL()
        alert("Image créée")
        ptro.hide()
        //new QRCode(document.getElementById("qrcode"), blockchain.slice(0,100));
        //html2pdf(element);
    }
});

function sendNft(){
    const nft = document.getElementById("description").value;


    console.log(nft)
    axios.post("http://localhost:3000/nft", {
        name: nft,
        price: price.value,
        ownerLogin: ownerLogin,
        nftSource: nftSource
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
            image.src = nftSource
            new QRCode(document.getElementById("qrcode"), ("Owner :" + sessionStorage.getItem('login') + " Date :" + dateTime));

            test = await html2pdf(element);

            window.location.href = 'http://localhost/projetNode/front/view/index.html'
        }
    })
}
ptro.show();
