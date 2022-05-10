const divLogin= document.getElementById("pseudo");
const avatar = document.getElementById("avatar");
const description = document.getElementById("description");
const imgVendue= document.getElementById('imgVendues');
divLogin.innerHTML=sessionStorage.getItem('login');

if(sessionStorage.getItem('avatar')){
    avatar.src=sessionStorage.getItem('avatar');
}else{
    avatar.src="../../front/design/img/default-avatar.jpg";
}
const profil= document.getElementById('profil');



if(sessionStorage.getItem('description')){
    description.innerHTML=sessionStorage.getItem('description');
}

    


//if(sessionStorage.getItem('avatar')){
//    avatar.src=sessionStorage.getItem('avatar');
//}else{
    //charger une image par defaut
//}



//POUR IMG FAIRE UNE REQUETE AJAX SUR LE NOMBRE DE VENTE
