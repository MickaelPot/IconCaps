const cheminNodeJS = "http://localhost:3000/inscription";

function verifierConnexion() {
    const mail = document.getElementById("email").value;
    const pseudo = document.getElementById("pseudo").value;
    const password = document.getElementById("password").value;
    const verifPass = document.getElementById("confirmPassword").value;
    const divErreur = document.getElementById("erreur");

    if (password === verifPass) {
        divErreur.innerHTML = "";

        let options = {
            method: 'POST',
            url: cheminNodeJS,
            params: {
                mail: mail,
                login: pseudo,
                password: password
            }
        }

        axios.request(options).then((response) => {
            console.log(response);
            if(response.data.erreur){
                divErreur.innerHTML=response.data.erreur;
            }else{
                window.location.href='http://localhost/projetNode/front/view/connexion.html'
            }
            
            
        }).catch((error) => {
            console.log(error)
        })
    } else {

        divErreur.innerHTML = "Les deux mots de passes doivent être identiques"

    }
}