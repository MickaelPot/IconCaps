const cheminNodeJS = "http://localhost:3000/";

function modifieProfil(){
    const image= document.getElementById("image");
    const description = document.getElementById("Description");

    //recuperer toutes les div

    //selectionner une requete AJAX parmis au moins une des 3 si les div sont remplies ou pas
    if(image.value !=""){
        let maBase64="";
        //encode l'image en base64
        const file = document.querySelector('input[type=file]')['files'][0];
        let reader = new FileReader();
        reader.onload= function (){
            maBase64=reader.result.replace("data:", "").replace(/^.+,/, "");
		    imageBase64Stringsep = maBase64;
            const login = sessionStorage.getItem("login");
            modifieAvatar(login, maBase64)
            
        }
        reader.readAsDataURL(file);
    }

    if( description.value != ""){
        const login = sessionStorage.getItem("login");
        modifieDescription(login, description.value);
    }

}

function modifieDescription(login, description){
    axios.post(cheminNodeJS+"ajouteDescription", {
        login:login,
        description: description
    }).then((response) =>{
        if(response.data.success){
            sessionStorage.setItem('description', description);
            window.location.href='../view/profile.html'
        }
    })
}

function modifieAvatar(login, base){
    axios.post(cheminNodeJS+"ajouteAvatar",{
        reader: base,
        login: login
    }).then((response) => {
        if(response.data.success){
            sessionStorage.setItem('avatar', "data:image/png;base64,"+base)
            window.location.href='../view/profile.html'
        }
    });
}