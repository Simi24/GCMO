function getAPI_token(){
    const client_id = "0fa2e58146a94e1ea6d372c510b88081"
    const client_secret = "7e2723d53e88421b9c80c384b38c7170"
    var url = "https://accounts.spotify.com/api/token"

    var access_token = window.localStorage.getItem('access_token')
    var tokenExpires = window.localStorage.getItem('tokenExpires')

fetch(url, {
    method: "POST",
    headers: {
        Authorization: "Basic " +
btoa(`${client_id}:${client_secret}`),
        "Content-Type": "application/x-www-form-urlencoded",
},
    body: new URLSearchParams({ grant_type: "client_credentials" }),
})
.then((response) => response.json())
.then(tokenResponse =>{
    //salvo il token di accesso nel local storage
    window.localStorage.setItem('access_token', tokenResponse.access_token)
    window.localStorage.setItem('tokenExpires', tokenResponse.expires_in)
    //console.log(tokenResponse.access_token),
}
    
)
    
}

var access_token = window.localStorage.getItem('access_token')
console.log(access_token)

if(access_token == ''){
    getAPI_token()
}

var tokenExpires = window.localStorage.getItem('tokenExpires')

setInterval(getAPI_token,  3600000)



//TODO: controllare quando il token scade e crarne uno nuovo

function spotifySearchTrack(parameters = ''){
    url = "https://api.spotify.com/v1/search?type=track&limit=20&market=IT&q=" + parameters

    return fetch(url, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem('access_token'),

        },
    })
    .then((response) => {
        if(response.ok) {
            return response.json()
        } else {
            return response.json().then(json => alert(json.status_message))
        }
        } 
    )
    
}

function sGetTrack(parameters = ''){
    indirizzo = "https://api.spotify.com/v1/tracks/" + parameters + "?market=IT"

    return fetch(indirizzo, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem('access_token'),

        },
    })
    .then((risposta) => {
        if(risposta.ok) {
            return risposta.json()
        } else {
            return risposta.json().then(json => alert(json.status_message))
        }
        } 
    )
}

function sGetGeneres(){
    indirizzo = "https://api.spotify.com/v1/recommendations/available-genre-seeds"

    return fetch(indirizzo, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem('access_token'),

        },
    })
    .then((risposta) => {
        if(risposta.ok) {
            return risposta.json()
        } else {
            return risposta.json().then(json => alert(json.status_message))
        }
        } 
    )
}

function sSearchArtists(parameters = ''){
    indirizzo = "https://api.spotify.com/v1/search?q=" + parameters + "&type=artist&limit=10"
    return fetch(indirizzo, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem('access_token'),

        },
    })
    .then((risposta) => {
        if(risposta.ok) {
            return risposta.json()
        } else {
            return risposta.json().then(json => alert(json.status_message))
        }
        } 
    )
}

function sGetArtists(parameters = ''){
    indirizzo = "https://api.spotify.com/v1/artists/" + parameters 

    return fetch(indirizzo, {
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + window.localStorage.getItem('access_token'),

        },
    })
    .then((risposta) => {
        if(risposta.ok) {
            return risposta.json()
        } else {
            return risposta.json().then(json => alert(json.status_message))
        }
        } 
    )
}


function findUser(users,user){
    //DOCUMENTAZIONE: 
    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find

    // SOLUZIONE 1
    // for(var i=0; i < users.length; user.email){
    //     console.log(users[i].email, user.email)
    //    if (users[i].email == user.email){
    //        return true;
    //    }
    // }
    // return false

    //     return++){
    //   
    // SOLUZIONE 2
    //if( users.find(u => u.email == user.email) == undefined){
    //   return false
    // }else{
    //   return true
    // }

    // SOLUZIONE 3
    return users.some(u => u.email == user.email) 

  
}

//Trova un nome tra le playlists, ritorna vero o falso
function findNome(playlists, nome){
    return playlists.some(p => p.nome == nome)
}

//Trova una canzone nella playlist, ritorna vero o falso
function findCanzone(playlist, id){
    
    for(var i = 0; i < playlist.canzoni.length; i++){
        if (playlist.canzoni[i] == id ){
            return true
        }
    }
    return false
}

//Trova un tag tra i tag di una playlist, vero o falso
function findTag(tags, tag){
    return tags.some(t => t == tag)
}

//Trova se un artista e' gia' presente
function findArtista(artisti, artista){
    return artisti.some(a => a == artista)
}

//Trova se un genere e' gia' presente
function findGenere(generi, genere){
    return generi.some(g => g == genere)
}

//Trova se una playlist che voglio importare l'ho gia' importata
function findPlaylistImportata(playlistsImportate, nomeUtente, nomePlaylist){
    console.log(playlistsImportate)
    console.log(nomeUtente)
    console.log(nomePlaylist)
    for(var i=0; i<playlistsImportate.length; i++){
        if(playlistsImportate[i].nomeUtente == nomeUtente && playlistsImportate[i].nome == nomePlaylist){
            return true
        }
      }
    return false
    

}

//Trova indice di una playlist condivisa
function findIndiceCondivisa(playlistsCondivise, nomePlaylist, nomeUtente){
    console.log(playlistsCondivise)
    console.log(nomePlaylist)
    console.log(nomeUtente)
    for(var i=0; i<playlistsCondivise.length; i++){
        console.log(playlistsCondivise[i].nomeUtente == nomeUtente)
        console.log(playlistsCondivise[i].nome == nomePlaylist)
        if(playlistsCondivise[i].nomeUtente == nomeUtente && playlistsCondivise[i].nome == nomePlaylist){
            return i
        }
    }
    return -1
}

//Controlla se data una mail ed una password se l'utente e' registrato
function utenteRegistrato(users, mail, password){

    for(var i=0; i < users.length; i++){
        if (users[i].email == mail && users[i].password == password){
            return true;                   
        }
    }
    return false;
}

function indiceUtenteRegistrato(users, mail, password){

    for(var i=0; i < users.length; i++){
        if (users[i].email == mail && users[i].password == password){
            return i;                   
        }
    }
    return i;
}

function getUtenteAttivo(){
    return window.localStorage.getItem('utenteAttivo')
}

function getIndiceUtenteAttivo(users, mail){
    for(var i=0; i<users.length; i++){
        if(users[i].email == mail){
            return i
        }
    }
    return -1
}

//restituisce la playlist che mi serve
function getPlaylist(playlists, nome){
    for(var i=0; i < playlists.length; i++){
        if(playlists[i].nome == nome){
            return playlists[i]
        }
    }
    //se torna -1 non c'e' la playlist che cerco
    return -1
}

function getUser(nome){
    users = window.localStorage.getItem('users')
    for(var i=0; i < users.length; i++){
        if(user[i].nome == nome){
            return user[i]
        }
    }
    return -1
}

//Aggiorna gli utenti quando faccio delle modifiche sull'utente attivo
function updateUser(){
    //console.log("vengo chiamta")
    utenteAttivo = getUtenteAttivo()
    utenteAttivo = JSON.parse(utenteAttivo)
    users = window.localStorage.getItem('users')
    users = JSON.parse(users)

    for(var i=0; i < users.length; i++){
        if(users[i].email == utenteAttivo.email){
            users[i] = utenteAttivo
        }
    }

    window.localStorage.setItem('users',JSON.stringify(users))
}

//logout
function logOut(){
    utente = JSON.parse(getUtenteAttivo())
    utente = null
    window.localStorage.setItem('utenteAttivo', JSON.stringify(utente))
}

//controllo form registrazione
function formRegistrazione(){
    var nome = document.getElementById('nome').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var conferma = document.getElementById('controlloPassword').value
    var email_reg_exp = /^([a-zA-Z0-9_.-])+@(([a-zA-Z0-9-]{2,})+.)+([a-zA-Z0-9]{2,})+$/;

    if ((nome == "") || (nome == "undefined")) {
        alert("Il campo Nome è obbligatorio.");
        document.modulo.nome.focus();
        return false;
    } else if(!email_reg_exp.test(email) || (email == "") || (email == "undefined")){
        alert("Inserire un indirizzo email corretto.");
        document.modulo.email.select();
        return false;
    } else if (password != conferma) {
        alert("La password confermata è diversa da quella scelta, controllare.");
        document.modulo.conferma.value = "";
        document.modulo.conferma.focus();
        return false;
    } else {
        return true
    }
}

//controllo form modifica dati personali
function modificaDati(){
    var nome = document.getElementById('nome').value
    var password = document.getElementById('password').value
    var conferma = document.getElementById('controlloPassword').value
   

    if ((nome == "") || (nome == "undefined")) {
        alert("Il campo Nome è obbligatorio.");
        document.modulo.nome.focus();
        return false;
    } else if (password != conferma) {
        alert("La password confermata è diversa da quella scelta, controllare.");
        document.modulo.conferma.value = "";
        document.modulo.conferma.focus();
        return false;
    } else {
        return true
    }
}

//ritorna la playlist su cui stiamo lavorando tra le playlist condivise, data mail e nome playlist
function getIndicePlaylistCondivisa(nomeUtente, nomePlaylist){
    var pc = JSON.parse(window.localStorage.getItem('playlistCondivise'))
    console.log(nomeUtente)
    console.log(nomePlaylist)
    for(var i=0; i<pc.length; i++){
        console.log(pc[i])
        console.log(i)
        if(pc[i].nomeUtente == nomeUtente && pc[i].nome == nomePlaylist){
            return i

        }
    }
    return false;
}

function getPlaylistCondivisa(nomeUtente, nomePlaylist){
    var pc = JSON.parse(window.localStorage.getItem('playlistCondivise'))
    console.log(nomeUtente)
    console.log(nomePlaylist)
    for(var i=0; i<pc.length; i++){
        if(pc[i].nomeUtente == nomeUtente && pc[i].nome == nomePlaylist){
            return pc[i]

        }
    }
    return false;
}

function getIndicePlaylistImportata(nomeUtente, nomePlaylist){
    var utente = JSON.parse(window.localStorage.getItem('utenteAttivo'))
    console.log(utente.playlistsImportate)

    for(var i=0; i<Object.keys(utente.playlistsImportate).length; i++){
        if(utente.playlistsImportate[i].nomeUtente == nomeUtente && utente.playlistsImportate[i].nome == nomePlaylist){
            return i
        }
    }
    return false
}
