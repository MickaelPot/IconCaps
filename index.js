var express = require('express');
var app = express();
const option= require('./parameters/configuration.js');
var mongoose = require ('mongoose');
const controlerUser= require ('./back/controler/user.controler.js');
const classUser = require ('./back/model/class/user.class.js');

/*
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
});
*/




// 1. Connection à la base de données
mongoose.connect(option.mongoConnexion, {useNewUrlParser: true, useUnifiedTopology: true});
var database= mongoose.connection;
database.on('error', console.error.bind(console, 'MongoDB connection error:'));

// 2. Test de la BDD
console.log(" test lecture de tous les users");
//controlerUser.renvoiListeUsers();




//construitUnUtilisateur(testJSON);
//controlerUser.verifieMDP("guilhem6", "azerty");






app.post('/',  (req, res)=>{
  try{
   

    //const login = req.query;
    //console.log(req.query);
    
    //const password = req.body.password;
    //const mail= req.body.mail;
    console.log("entree AJAX");
    res.send('bidule');

    //res.send('truc');
  }catch (error){
    console.log(error);
  }
})


app.listen(option.port);

async function construitUnUtilisateur(json){
  let monUtilisateur= await new classUser(json);
  const modifMDP=monUtilisateur.hashPsw(monUtilisateur.password);
  if(modifMDP.status){
    const resultat= await controlerUser.insereUnUserEnBDD(monUtilisateur);
    return monUtilisateur;
  }else{
    const JSONError={"erreur":"impossible d'inserer l'utilisateur en base de données"};
    return JSONError;
  }
}