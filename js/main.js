var blockContacto = document.getElementById("contacto")
var blockChat = document.getElementById("teamNotes");
var blockJuegosProgramados = document.getElementById("juegosProgramados");


var signInButton = document.getElementById('signInButton');
var logOutButton = document.getElementById('logOutButton');
var cuadroMensajeria = document.getElementsByClassName("msgcontainer");

var DataBase = firebase.database();





var partido = [""];

formMensaje.style.display = "none";


blockChat.style.display = "none";
blockContacto.style.display = "none";




function mostrarFall() {
    var blockContacto = document.getElementById("contacto")
    var blockChat = document.getElementById("teamNotes");
    var blockJuegosProgramados = document.getElementById("juegosProgramados");
    blockJuegosProgramados.style.display = "block";
    blockContacto.style.display = "none";
    blockChat.style.display = "none";
}

function mostrarContact() {
    var blockContacto = document.getElementById("contacto")
    var blockChat = document.getElementById("teamNotes");
    var blockJuegosProgramados = document.getElementById("juegosProgramados");
    blockJuegosProgramados.style.display = "none";
    blockContacto.style.display = "block";
    blockChat.style.display = "none";

}

function limpiarMSG() {
    document.getElementsByClassName("msgcotainer").innerHTML = '';
    //DataBase.ref().off();
}



var app = new Vue({
    el: '#app',
    data: {

        mensaje: '',
        mensajes: [],
        userEmail: '',
        userPassword: '',
        partidos: [
            {
                ID: "GAME1",
                MES: 'September',
                DIA: '9/01',
                TEAMS: 'U1 and U4',
                LOCATION: 'AJ Katzenmaier',
                TIME: '9:30',

            },
            {
                ID: "GAME2",
                MES: 'September',
                DIA: '9/01',
                TEAMS: 'U3 and U2',
                LOCATION: 'Greenbay',
                TIME: '13:00'
            },
            {
                ID: "GAME3",
                MES: 'September',
                DIA: '9/08',
                TEAMS: 'U5 and U6',
                LOCATION: 'Howard A Yeager',
                TIME: '9:30'
            },
            {
                ID: "GAME4",
                MES: 'September',
                DIA: '9/08',
                TEAMS: 'U6 and U1',
                LOCATION: 'Marjorie P Hart',
                TIME: '13:00'
            },
            {
                ID: "GAME5",
                MES: 'September',
                DIA: '9/15',
                TEAMS: 'U2 and U4',
                LOCATION: 'North',
                TIME: '13:00'
            },
            {
                ID: "GAME6",
                MES: 'September',
                DIA: '9/15',
                TEAMS: 'U3 and U5',
                LOCATION: 'AJ Katzenmaier',
                TIME: '9:30'
            },
            {
                ID: "GAME7",
                MES: 'September',
                DIA: '9/22',
                TEAMS: 'U1 and U3',
                LOCATION: 'South',
                TIME: '9:30'
            },
            {
                ID: "GAME8",
                MES: 'September',
                DIA: '9/22',
                TEAMS: 'U2 and U6',
                LOCATION: 'Howard A Yeager',
                TIME: '13:00'
            },
            {
                ID: "GAME9",
                MES: 'September',
                DIA: '9/29',
                TEAMS: 'U4 and U5',
                LOCATION: 'Greenbay',
                TIME: '9:30'
            },
            {
                ID: "GAME10",
                MES: 'October',
                DIA: '10/06',
                TEAMS: 'U2 and U5',
                LOCATION: 'Marjorie P Hart',
                TIME: '9:30'
            },
            {
                ID: "GAME11",
                MES: 'October',
                DIA: '10/06',
                TEAMS: 'U1 and U6',
                LOCATION: 'South',
                TIME: '13:00'
            },
            {
                ID: "GAME12",
                MES: 'October',
                DIA: '10/13',
                TEAMS: 'U3 and U4',
                LOCATION: 'Howard A Yeager',
                TIME: '9:30'
            },
            {
                ID: "GAME13",
                MES: 'October',
                DIA: '10/13',
                TEAMS: 'U3 and U4',
                LOCATION: 'Greenbay',
                TIME: '13:00'
            },
            {
                ID: "GAME14",
                MES: 'October',
                DIA: '10/20',
                TEAMS: 'U6 and U3',
                LOCATION: 'North',
                TIME: '9:30'
            },
            {
                ID: "GAME15",
                MES: 'October',
                DIA: '10/20',
                TEAMS: 'U2 and U4',
                LOCATION: 'Marjorie P Hart',
                TIME: '13:00'
            },
            {
                ID: "GAME16",
                MES: 'October',
                DIA: '10/27',
                TEAMS: 'U3 and U1',
                LOCATION: 'AJ Katzenmaier',
                TIME: '9:30'
            },
            {
                ID: "GAME17",
                MES: 'October',
                DIA: '10/27',
                TEAMS: 'U5 and U6',
                LOCATION: 'Howard A Yeager',
                TIME: '13:00'
            },

        ]
    },
    methods: {


        mostrarChat: function (partidoID) {
            var blockContacto = document.getElementById("contacto")
            var blockChat = document.getElementById("teamNotes");
            var blockJuegosProgramados = document.getElementById("juegosProgramados");
            blockJuegosProgramados.style.display = "none";
            blockContacto.style.display = "none";
            blockChat.style.display = "block";

            ////SELECCION DE PARTIDO//
            partido = '/' + partidoID + '/';
            console.log(partido);


            //////
            /////LIMPIAR PANTALLA///
            limpiarMSG();
            ////
            //ACTUALIZAR EL VUE POR PARTIDO SELECCIONADO///

            actualizar(partido);

            //////
        },


        send: function () {
            var d = new Date();
            var postData = {
                texto: app.mensaje,
                email: firebase.auth().currentUser.email,
                picture: (firebase.auth().currentUser.photoURL || '/images/silhouette.jpg'),
                date: d.toUTCString()
            };
            var updates = {
                //"mesajes/1": postData
            };
            var key = DataBase.ref().push().key;
            updates[partido + key] = postData;
            DataBase.ref().update(updates).then(function (result) {
                console.log("mensaje enviado");
                document.getElementById('inputText').value = '';
            });


        },
        login: function () {
            var provider = new firebase.auth.GoogleAuthProvider();
            firebase.auth().signInWithPopup(provider);

            console.log("cuenta logueada Google");

            formRegister.style.display = "none";
            signInButton.style.display = "none";
            logOutButton.style.display = "inline-block";
            formMensaje.style.display = "block";
        },

        register: function () {
            firebase.auth().createUserWithEmailAndPassword(app.userEmail, app.userPassword)
                .then(function () {
                    console.log("cuenta creada");


                    formRegister.style.display = "none";
                    signInButton.style.display = "none";
                    logOutButton.style.display = "inline-block";
                    formMensaje.style.display = "block";
                })
                .catch(function (error) {
                    console.log("Error: " + error)
                })

        },
        loginEmail: function () {
            firebase.auth().signInWithEmailAndPassword(app.userEmail, app.userPassword)
                .then(function () {
                    console.log("cuenta logueada");

                    formRegister.style.display = "none";
                    signInButton.style.display = "none";
                    logOutButton.style.display = "inline-block";
                    formMensaje.style.display = "block";

                })
                .catch(function (error) {
                    console.log("Error de login: " + error)
                })

        },
        logoutEmail: function () {
            firebase.auth().signOut()
                .then(function () {

                    console.log("Cuenta Deslogueada");
                    formMensaje.style.display = "none";
                    formRegister.style.display = "block";
                    logOutButton.style.display = "none";
                    mostrarFall();
                    limpiarMSG();
                })

        }

    }
})

/* original*/
function actualizar(xxx) {
    app.mensajes = []; //trampita para reiniciar la variable para dibujar por el VUE
    DataBase.ref(xxx).on('child_added', function (data) {
        app.mensajes.push(data.val())
    })
}