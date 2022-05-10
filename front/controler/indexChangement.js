function vendreMaintenant(){
    if (!sessionStorage.getItem('login')) {
        window.location.href = "http://localhost/projetNode/front/view/connexion.html"
    } else {
        window.location.href = "http://localhost/projetNode/front/view/annonce.html"
    }
}