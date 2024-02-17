document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    let db = firebase.firestore();

    loadSelectItems()
});
function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

function reserve(){
    if(document.getElementById("typeOf").value == "default"){
        alert("Válasszon szolgáltatást!")
    }
    else{
        function getNullInputs(querySelector){
            hasNullInput = false;
            document.querySelectorAll(querySelector).forEach(input => {
                if(input.value === ""){
                    hasNullInput = true;
                }
                else{

                }
            })
            return hasNullInput;
        }

        if(getNullInputs(".data input") === true){
            alert("Töltse ki az összes mezőt")
        }
        else{
            let db = firebase.firestore()
            let name = `${document.getElementById("lname").value} ${document.getElementById("fname").value}`;
            let date = document.getElementById("date").value;
            let type = document.getElementById("typeOf").value;
            let time = document.getElementById("time").value;
            let email = document.getElementById("email").value;
            
            if(db.collection("activities").doc(type).collection("reservation").doc("example")){
                db.collection("activities").doc(type).collection("reservation").doc("example").delete().then(() => {
                })
                .catch((error) => {
                    console.error(error)
                })
            }

            db.collection("activities").doc(type).collection("reservation").doc(getRandomString(20)).set({
                date: date,
                name: name,
                time: time,
                email: email,
            })
                .then(() => {
                    document.querySelector(".modal").innerHTML = "Sikeres foglalás"
                    Email.send({
                        Host : "smtp.elasticemail.com",
                        Username : "palyi.kristof@gmail.com",
                        Password : "55F2AD60A8A5F250D372D886CD36C6F3101A",
                        To : email,
                        From : "palyi.kristof@gmail.com",
                        Subject : "Foglalás a Pesterzsébet Egészségházba",
                        Body : `Ön időpontot foglalt a Pesterzsébet Egészségházba. Dátum: ${date}, Időpont: ${time}, Szolgáltatás: ${type}. Köszönjük a foglalásást!`
                      }).then(
                        message => alert(message)
                      );
                    window.location.href = "../../index.html"
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                    document.querySelector(".modal").innerHTML = "Sikertelen foglalás"
                });
                // nodemailer = require('nodemailer'),
                // transporter = nodemailer.createTransport(),
               
                // transporter.sendMail({
                //          from: 'noreply@egeszseghazpesterzsebet.web.app',
                //          to: email,
                //          subject: 'Password Reset',
                //          text: 'Your new password is: ' + password
                //        });
        }


        
    }
}

// ! -----------------------------

function loadSelectItems(){

    let db = firebase.firestore()

    let typeRef = db.collection("newreservation")

    let option = document.createElement("option")
    option.value = "default"
    option.innerHTML = "Válasszon szolgáltatást!"


    document.getElementById("typeOf").appendChild(option)
    
    typeRef.get()
        .then(newreservations => {
            newreservations.forEach(reservation => {

                let option = document.createElement("option")
                option.value = reservation.id
                option.innerHTML = reservation.id


                document.getElementById("typeOf").appendChild(option)

            })
        })
    

}

setTimeout(() => {
    
    document.querySelector(".lds-hourglass").style.display = "none";
    document.querySelector("#typeOf").style.display = "inline-block";

}, 1000);

// ! -----------------------------

function englishify(img){
    
    img = img.replace("á", "a")
    img = img.replace("é", "e")
    img = img.replace("í", "i")
    img = img.replace("/ö|ő|ó/g", "o")
    img = img.replace("/ű|ú|ü/g", "u")

    return `${img}.jpg`


}


// ! -------------------------------------------------------------------------

function getOption(optionValue){
    if(optionValue === "default"){
        alert("Válasszon szolgáltatást!")
    }
    else{
        let db = firebase.firestore()


        typeRef = db.collection("newreservation").doc(optionValue);
    
        typeRef.get()
            .then((types) => {

                let imgUrl = null


                const images = firebase.storage().ref().child(optionValue);
                const image = images.child(englishify(optionValue));
                image.getDownloadURL().then((url) => { 
                    imgUrl = url
                });



                setTimeout(() => {
                    data = types.data();
                    document.getElementById("name").innerHTML = data.name;
                    document.getElementById("desc").innerHTML = data.desc;
                    document.getElementById("phone").innerHTML = data.phone;
                    document.getElementById("photo").style.background = `url("${imgUrl}")`
                    document.getElementById("photo").style.backgroundSize = "cover";
                    document.getElementById("photo").style.backgroundPosition = "center";
                    document.getElementById("photo").style.backgroundRepeat = "no-repeat";
                    document.getElementById("photo").style.border = "none";
                    document.getElementById("photo").setAttribute("onclick", `zoom("${imgUrl}")`)
                }, 1500);
                
            })
    }
}

let topnavOption = document.querySelector("#topnavOption")

topnavOption.addEventListener("mouseover", () => {
    document.getElementById("topnavSpan").style.width = "100%"
})
topnavOption.addEventListener("mouseout", () => {
    document.getElementById("topnavSpan").style.width = "0%"
})

// ! --------------------------------------------------------------

let topnavOption1 = document.querySelector("#topnavOption1")

topnavOption1.addEventListener("mouseover", () => {
    document.getElementById("topnavSpan1").style.width = "100%"
})
topnavOption1.addEventListener("mouseout", () => {
    document.getElementById("topnavSpan1").style.width = "0%"
})

// ! ---------------------------------------------------------------

let topnavOption2 = document.querySelector("#topnavOption2")

topnavOption2.addEventListener("mouseover", () => {
    document.getElementById("topnavSpan2").style.width = "100%"
})
topnavOption2.addEventListener("mouseout", () => {
    document.getElementById("topnavSpan2").style.width = "0%"
})

// ! -------------------------------------------------------------

let topnavOption3 = document.querySelector("#topnavOption3")

topnavOption3.addEventListener("mouseover", () => {
    document.getElementById("topnavSpan3").style.width = "100%"
})
topnavOption3.addEventListener("mouseout", () => {
    document.getElementById("topnavSpan3").style.width = "0%"
})

// ! ------------------------------------------------------------

let topnavOption4 = document.querySelector("#topnavOption4")

topnavOption4.addEventListener("mouseover", () => {
    document.getElementById("topnavSpan4").style.width = "100%"
})
topnavOption4.addEventListener("mouseout", () => {
    document.getElementById("topnavSpan4").style.width = "0%"
})

// ! ------------------------------------------------------------

let navicon = document.querySelector(".topnavOpener i");

navicon.addEventListener("click", () => {
    if (document.querySelector(".topnav").style.display == "none") {
        document.querySelector(".topnav").style.display = "flex"
    }
    else{
        document.querySelector(".topnav").style.display = "none"
    }
})


function toSecondPage(){
    window.location.href="../../pages/wip.html"
}

// ! ------------------------------------------------------------------

function toThirdPage(){
    window.location.href="../../index.html#services"
}

// ! -------------------------------------------------------------------------

function toFourthPage(){
    window.location.href="../../pages/newreservation.html"
}

// ! -------------------------------------------------------------------

function toFifthPage(){
    window.location.href="../../pages/login.html"
}

// ! -------------------------------------------------------------------

function toFirstPage(){
    window.location.href = "../../index.html"
}

function zoom(bg){

    let modal = document.createElement("div")
    modal.setAttribute("class", "imgModal")
    modal.setAttribute("onclick", "closeModal(this)")

    let img = document.createElement("div")
    img.setAttribute("class", "zoomedImg")
    img.style.background = `url("${bg}")`
    img.style.backgroundPosition = "center"
    img.style.backgroundRepeat = "no-repeat"
    img.style.backgroundSize = "contain"
    let p = document.createElement("h4")
    p.innerHTML = "Kattints a képen kívülre a bezáráshoz!"

    modal.appendChild(p)
    modal.appendChild(img)
    document.body.appendChild(modal)

}

function closeModal(element) {
    element.remove()
}