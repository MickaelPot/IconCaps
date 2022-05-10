
var chat = document.getElementById("liste")

let options = {
    method: 'POST',
    url: "http://localhost:3000/getNft",
}

axios.request(options).then((response) => {
    console.log(response);
    if(response.data.erreur){
        // Afficher erreur
    } else {
        response.data.forEach(
            element => {
                console.log(element._id)
                var innerLi = document.createElement('li');
                var innerDiv = document.createElement('div');
                var img = document.createElement('img');
                var innerP = document.createElement('p')
                img.src = element.nftSource
                innerDiv.className = "imageListe"
                innerDiv.appendChild(img);
                innerLi.appendChild(innerDiv);
                innerDiv = document.createElement('div');
                innerDiv.className = "infos"
                innerP.innerText = ""+element.price+"€";
                innerP.className = "prix"
                innerDiv.appendChild(innerP);
                innerP = document.createElement('p')
                innerP.className = "favoris"
                innerP.innerText = "❤️️";
                var innerSpan = document.createElement("span")
                innerSpan.className = "nbFavoris"
                innerSpan.innerText = "100" // STATIC
                innerP.appendChild(innerSpan);
                innerDiv.appendChild(innerP);
                innerLi.appendChild(innerDiv)
                var innerAnchor = document.createElement("a")
                innerAnchor.onclick = function (){
                    sessionStorage.setItem('nft', JSON.stringify({
                        name: element.name,
                        price: element.price,
                        ownerLogin: element.ownerLogin,
                        nftSource: element.nftSource
                    }));
                }
                console.log(element)
                innerAnchor.href="http://localhost/projetNode/front/view/fiche.html"
                innerLi.appendChild(innerAnchor)
                chat.appendChild(innerLi);
            })

    }
}).catch((error) => {
    console.log(error)
})