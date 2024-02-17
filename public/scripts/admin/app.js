
document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    let db = firebase.firestore();


    const reserveRef = db.collection("activities")
    let types = []


    

    reserveRef.get()
        .then(docs => {
            docs.forEach(doc => {
                types.push(doc.id)
            })
            for (let index = 0; index < types.length; index++) {
                const type = types[index];
                db.collection("newreservation").doc(types[index]).get()
                    .then(datas => {
                        let img = datas.data().img
                        db.collection("activities").doc(type).collection("reservation").get()
                        .then(reservations => {

                            let imgUrl = null


                            const images = firebase.storage().ref().child(type);
                            const image = images.child(englishify(type));
                            image.getDownloadURL().then((url) => { 
                                imgUrl = url
                                
                                setTimeout(() => {
                                    let titleLeft = document.createElement("div")
                                    titleLeft.setAttribute("class", "titleLeft")
                                    let h3 = document.createElement("h3");
                                    h3.innerHTML = types[index]
                                    h3.style.textTransform = "capitalize"
                                    titleLeft.appendChild(h3)
                                    document.querySelector(".mainContent").appendChild(titleLeft)
            
            
                                    let reserves = document.createElement("div")
                                    reserves.setAttribute("class", "reserves")
                                    reservations.forEach(reservation => {
                                        
            
                                        
            
                                    let reserve = document.createElement("div")
                                    reserve.setAttribute("class", "reserve")
                                    reserve.style.background = `url("${imgUrl}")`
                                    reserve.style.backgroundSize = "cover"
                                    reserve.style.backgroundRepeat = "no-repeat"
                                    reserve.style.backgroundPosition = "center"
        
                                    let data = document.createElement("div")
                                    data.setAttribute("class", "data");
        
                                    let name = document.createElement("div")
                                    name.setAttribute("class", "name")
                                    let nameText = document.createElement("p")
                                    nameText.innerHTML = reservation.data().name
                                    name.appendChild(nameText)
                                    data.appendChild(name)
        
                                    let type = document.createElement("div")
                                    type.setAttribute("class", "type")
                                    let typeText = document.createElement("p")
                                    typeText.innerHTML = types[index]
                                    type.appendChild(typeText)
                                    data.appendChild(type)
        
                                    let date = document.createElement("div")
                                    date.setAttribute("class", "date")
                                    let dateText = document.createElement("p")
                                    dateText.innerHTML = reservation.data().date
                                    date.appendChild(dateText)
                                    data.appendChild(date)
    
                                    let time = document.createElement("div")
                                    date.setAttribute("class", "time")
                                    let timeText = document.createElement("p")
                                    timeText.innerHTML = reservation.data().time
                                    time.appendChild(timeText)
                                    data.appendChild(time)
    
                                    let email = document.createElement("div")
                                    date.setAttribute("class", "email")
                                    let emailText = document.createElement("p")
                                    emailText.innerHTML = reservation.data().email
                                    email.appendChild(emailText)
                                    data.appendChild(email)
        
                                    reserve.appendChild(data)
                                    reserves.appendChild(reserve)
                                    document.querySelector(".mainContent").appendChild(reserves)
                                }, 2000);
                            });

                            
    
                        })
                    })
                })              
            }
        })

        loadReservationChangers()
    });



function loadReservationChangers(){


    
    let db = firebase.firestore()

    let reservationPanel = document.createElement("div");
    reservationPanel.setAttribute("class", "reservationPanel");

    let typesRef = db.collection("newreservation")
    typesRef.get()
        .then(datas => {
            datas.forEach(data => {

                let type = data.id
                
                const images = firebase.storage().ref().child(type);
                const image = images.child(englishify(type));
                image.getDownloadURL().then((url) => { 
                    imgUrl = url


                    setTimeout(() => {

                        let panel = document.createElement("div");
                        panel.setAttribute("class", "panel")

                        
                        let panelType = document.createElement("div")
                        panelType.setAttribute("class", "type")
                        let typeText = document.createElement("p")
                        typeText.innerHTML = type
                        typeText.style.textTransform = "capitalize";
                        typeText.style.textAlign = "center";
                        panelType.appendChild(typeText);
                        panel.appendChild(panelType);

                        let del = document.createElement("div");
                        del.setAttribute("class", "del");
                        del.setAttribute("id", `${type}DeleteButton`)
                        del.setAttribute("onclick", "deleteType(this.id)")
                        delText = document.createElement("i")
                        delText.setAttribute("class", "fa fa-trash-o")
                        del.appendChild(delText)
                        panel.appendChild(del);

                        reservationPanel.appendChild(panel)

                        document.querySelector(".mainContent").appendChild(reservationPanel)


                    }, 2000);
                    
                    document.querySelector(".mainContent").style.display = "flex";
                    document.querySelector(".container").style.display="none";
                })

            })
        })

    setTimeout(() => {
        let addNewType = document.createElement("button")
        addNewType.setAttribute("class", "addNewType")
        addNewType.innerHTML = "+";
        addNewType.setAttribute("onclick", "loadNewTypeAdder()")
        document.querySelector(".reservationPanel").appendChild(addNewType)
    }, 4000);

}

function getDeleteButtonId(id){
    return(id.replace("DeleteButton", ""))
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


function getRandomString(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
}

function deleteType(id){

    let db = firebase.firestore()

    deleteId = getDeleteButtonId(id);

    db.collection("activities").doc(deleteId).collection("reservation").doc("example").delete().then(() => {
    })
        .catch(err => {
            console.error(err)
        })

    db.collection("activities").doc(deleteId).delete().then(() => {
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    
    db.collection("newreservation").doc(deleteId).delete().then(() => {
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });
    
    db.collection("timeTable").doc(`${deleteId}Timetable`).delete().then(() => {
    }).catch((error) => {
        console.error("Error removing document: ", error);
    });

    firebase.storage().ref(deleteId).delete().then(() => {
    })
        .catch((error) => {
            console.error("Error deleting document: ", error);
        })

    firebase.storage().ref(deleteId).child(englishify(deleteId)).delete().then(() => {
        alert("Sikeres törlés")
        window.location.reload()
    })
        .catch((error) => {
            console.error("Error deleting document: ", error);
        })

    
    //location.reload()
}

function loadNewTypeAdder() {

    let newTypeAdder = document.createElement("div")
    newTypeAdder.setAttribute("class", "newTypeAdder");
    newTypeAdder.setAttribute("id", "newTypeAdder");


    
    let dataType = document.createElement("div")
    dataType.setAttribute("class", "data");

    let labelType = document.createElement("label")
    labelType.innerHTML = "Add meg a szolgáltatás nevét"

    let inputType = document.createElement("input")
    inputType.placeholder = "Pl.: fodrász"
    inputType.setAttribute("id", "inputType")
    dataType.appendChild(labelType)
    dataType.appendChild(inputType)


    let dataName = document.createElement("div")
    dataName.setAttribute("class", "data");

    let labelName = document.createElement("label")
    labelName.innerHTML = "Add meg a dolgozó(k) nevét"

    let inputName = document.createElement("input")
    inputName.placeholder = "Pl.: Sajtos Sámuel"
    inputName.setAttribute("id","inputName")
    dataName.appendChild(labelName)
    dataName.appendChild(inputName)


    let dataDesc = document.createElement("div")
    dataDesc.setAttribute("class", "data");

    let labelDesc = document.createElement("label")
    labelDesc.innerHTML = "Adj meg egy rövid leírást a szolgáltatásról pár mondatban."

    let inputDesc = document.createElement("input")
    inputDesc.placeholder = "Pl.: A fodrászatunk...."
    inputDesc.setAttribute("id", "inputDesc")
    dataDesc.appendChild(labelDesc)
    dataDesc.appendChild(inputDesc)


    let dataPhone = document.createElement("div")
    dataPhone.setAttribute("class", "data");

    let labelPhone = document.createElement("label")
    labelPhone.innerHTML = "Add meg a telefonszámát a dolgozónak"

    let inputPhone = document.createElement("input")
    inputPhone.placeholder = "Pl.: 06 30 456 7802"
    inputPhone.setAttribute("id", "inputPhone")
    dataPhone.appendChild(labelPhone)
    dataPhone.appendChild(inputPhone)

    
    let dataImg = document.createElement("div")
    dataImg.setAttribute("class", "data");

    let labelImg = document.createElement("label")
    labelImg.innerHTML = "Adj meg egy képet a szolgáltatásnak"

    let inputImg = document.createElement("input")
    inputImg.setAttribute("id", "inputImg")
    inputImg.setAttribute("type", "file")
    dataImg.appendChild(labelImg)
    dataImg.appendChild(inputImg)
    
    let button = document.createElement("button")
    button.innerHTML = "OK"
    button.setAttribute("onclick", "createNewType()")

    newTypeAdder.appendChild(dataType)
    newTypeAdder.appendChild(dataName)
    newTypeAdder.appendChild(dataPhone)
    newTypeAdder.appendChild(dataDesc)
    newTypeAdder.appendChild(dataImg)
    newTypeAdder.appendChild(button)

    document.querySelector(".mainContent").appendChild(newTypeAdder)

    window.location.href = "#newTypeAdder"
    

}

function englishify(img){

    img = img.replace("á", "a")
    img = img.replace("é", "e")
    img = img.replace("í", "i")
    img = img.replace("/ö|ő|ó/g", "o")
    img = img.replace("/ű|ú|ü/g", "u")

    return `${img}.jpg`


}


function createNewType() {

    let db = firebase.firestore()
    let type = document.getElementById("inputType").value;
    let name = document.getElementById("inputName").value;
    let desc = document.getElementById("inputDesc").value;
    let phone = document.getElementById("inputPhone").value;
    
    let container = document.createElement("div")
    container.setAttribute("id", "containerAddNew")
    container.setAttribute("class", "container")
    let title = document.createElement("h2")
    title.innerHTML = "Új szolgáltatás feltöltése..."
    container.appendChild(title)
    let loader = document.createElement("div")
    loader.setAttribute("class", "lds-hourglass")
    container.appendChild(loader)
    document.getElementById("newTypeAdder").style.display = "none"
    document.querySelector(".mainContent").appendChild(container)


    let file = document.getElementById("inputImg").files[0];
    var storageRef = firebase.storage().ref(type +"/"+englishify(type));
    let task = storageRef.put(file);
    task.on('state_changed', function progress(snapshot) {
        
    }, function error(err) {
        console.error(err);
    
    },function complete() {
    });


    storageRef = firebase.storage().ref(type);
    task = storageRef.put(file);
    task.on('state_changed', function progress(snapshot) {
        
    
    }, function error(err) {
        console.error(err);
    
    },function complete() {

        let imgUrl = null


        const images = firebase.storage().ref().child(type);
        const image = images.child(englishify(type));
        image.getDownloadURL().then((url) => { 
            imgUrl = url
        })
    
    
        setTimeout(() => {
            db.collection("newreservation").doc(type).set({
                desc: desc,
                name: name,
                img: imgUrl,
                phone: phone,
            })
                .then(() => {
                })
                .catch((error) => {
                    console.error(error)
                    alert("Valami hiba történt!")
                })

                db.collection("activities").doc(type).set({})
                .then(() => {
                })
                .catch((error) => {
                    console.error(error)
                })
        
                db.collection("activities").doc(type).collection("reservation").doc("example").set({
                    name: "Ez egy teszt foglalás, hogy működik-e az új szolgáltatás.",
                    date: "Törölve lesz az első tényleges foglalásnál."
                })
                    .then(() => {
                        document.getElementById("containerAddNew").remove()
                        alert("Sikeresen hozzáadva!")
                        window.location.reload()
                    })
                    .catch((error) => {
                        console.error(error);
                    })
            // db.collection("activities").doc(type).collection("reservation").doc("example").delete().then(() => {
            // }).catch((error) => {
            //     console.error("Error removing document: ", error);
            // });
        
            

        }, 2000);
    
    });



    

}
