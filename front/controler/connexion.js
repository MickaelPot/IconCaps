const cheminNodeJS = "http://localhost:3000/connexion";
const divErreur= document.getElementById("erreur");

function connexion(){
    const mailLogin = document.getElementById("email").value;
    const password =document.getElementById("password").value;

    let options = {
        method: 'POST',
        url: cheminNodeJS,
        params: {
            login: mailLogin,
            mail: mailLogin,
            password: password
        }
    }

    axios.request(options).then((response) => {
        console.log(response);
        if(response.data.erreur){
            divErreur.innerHTML=response.data.erreur;
        }else{
            sessionStorage.setItem('login', response.data.login);
            sessionStorage.setItem('mail', response.data.mail);
            sessionStorage.setItem('dateInscription',response.data.dateInscription);
            sessionStorage.setItem('id',response.data._id);
            sessionStorage.setItem('avatar', response.data.avatar);

            window.location.href='http://localhost/projetNode/front/view/index.html'
        }
    });
}