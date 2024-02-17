document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    let db = firebase.firestore();



    loadCurrentPics()
    loadPicChangers()
    loadCurrentText()
    loadTextChangers()
    loadCurrentPhones()
    loadPhoneChangers()

    setTimeout(() => {
        document.querySelector(".mainContent").style.display = "flex";
        document.querySelector(".container").style.display="none";
    }, 1500);


})
// ! initialize the page and load the elements


function englishify(img){
    
    img = img.replace("á", "a")
    img = img.replace("é", "e")
    img = img.replace("í", "i")
    img = img.replace("/ö|ő|ó/g", "o")
    img = img.replace("/ű|ú|ü/g", "u")

    return `${img}.jpg`


}

function loadCurrentPics() {
    let db = firebase.firestore();
    let picRef = db.collection("newreservation")

    picRef.get()
        .then(newreservations => {
            newreservations.forEach( newreservation => {
                data = newreservation.data();
                let imgUrl = null


                const images = firebase.storage().ref().child(newreservation.id);
                const image = images.child(englishify(newreservation.id));
                image.getDownloadURL().then((url) => { 
                    imgUrl = url
                });



                setTimeout(() => {
                    let container = document.createElement("div");
                    container.setAttribute("class", "container");
                    container.style.maxWidth = "50%"
                    container.style.maxHeight = "50%"
    
                    let currentPic = document.createElement("div");
                    currentPic.setAttribute("class", "currentPic");
                    currentPic.style.background = `url(${imgUrl})`;
                    currentPic.style.backgroundSize = "cover";
                    currentPic.style.backgroundPosition = "center";
                    currentPic.style.backgroundRepeat = "no-repeat";
                    currentPic.style.width = "50vmin";
                    currentPic.style.height = "50vmin";
                    currentPic.style.borderRadius = "6px";
    
                    let text = document.createElement("h3");
                    text.innerHTML = newreservation.id
                    text.style.textTransform = "capitalize";
    
                    container.appendChild(currentPic);
                    container.appendChild(text);
    
                    document.querySelector(".currentPics").appendChild(container);
                }, 1500);

            })
        })
}

// ! ------------------------------

function loadPicChangers() {
    let db = firebase.firestore();
    picRef = db.collection("newreservation");

    picRef.get()
        .then(newreservations => {
            newreservations.forEach(newreservation => {
                data = newreservation.data();

                let adjuster = document.createElement("div")
                adjuster.setAttribute("class", "adjuster")

                adjuster.style.maxWidth = "90%"
                adjuster.style.maxHeight = "90%"

                let label = document.createElement("label")
                label.innerHTML = `Változtassa meg a <span style="font-weight: bold; text-transform: capitalize">${newreservation.id}</span> hátterét`

                let input = document.createElement("input")
                input.setAttribute("type", "file")
                input.setAttribute("id", newreservation.id)

                adjuster.appendChild(label)
                adjuster.appendChild(input)

                document.querySelector(".changePics").appendChild(adjuster)
            })
        })
}

// ! -----------------------------

function getPicPath(path) {
    let list = path.split("\\")
    let index = list.length - 1

    return `../public/${list[index]}`
}

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// ! -----------------------------

setTimeout(() => {
    let changePicInputs = document.querySelectorAll(".changePics .adjuster input");
    let uploader = document.getElementById("uploader")

    changePicInputs.forEach(input => {
        input.addEventListener("input", (e) => {
            var file = e.target.files[0];
            storageRef = firebase.storage().ref(input.id);
            var task = storageRef.put(file);
            task.on('state_changed', function progress(snapshot) {
                var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                uploader.value = percentage;
            
            }, function error(err) {
                console.error(err);
            
            },function complete() {
                uploader.value = 0
            });
            // Create a reference to the file to delete
            var storageRef = firebase.storage().ref(input.id);
            var deleteRef = storageRef.child(englishify(input.id));

            // Delete the file
            deleteRef.delete()
                .then(() => {
                    var file = e.target.files[0];
                    var storageRef = firebase.storage().ref(input.id+"/"+englishify(input.id));
                    var task = storageRef.put(file);
                    task.on('state_changed', function progress(snapshot) {
                      var percentage = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
                      uploader.value = percentage;
                  
                    }, function error(err) {
                        console.error(err);
                  
                    },function complete () {
                        uploader.value = 0
                        setTimeout(() => {
                            removeAllChildNodes(document.querySelector('.currentPics'))
                            removeAllChildNodes(document.querySelector('.changePics'))


                            let progress = document.createElement("progress")
                            progress.setAttribute("value", "0")
                            progress.setAttribute("max", "100")
                            progress.setAttribute("id", "uploader")
                            progress.innerHTML = 0%
                            document.querySelector(".changePics").appendChild(progress)

                            loadCurrentPics()
                            loadPicChangers()
                        }, 1000);
                    });

                    
                })
                .catch((error) => {
                    
                });
        })
    })
    
}, 2000);



// TODO: make replica of the above for text adjustment



function loadCurrentText() {
    let db = firebase.firestore();
    let picRef = db.collection("newreservation")

    picRef.get()
        .then(newreservations => {
            newreservations.forEach( newreservation => {
                data = newreservation.data();

                let container = document.createElement("div");
                container.setAttribute("class", "container");
                container.style.maxWidth = "50%"
                container.style.maxHeight = "50%"

                let currentName = document.createElement("h3");
                currentName.setAttribute("class", "currentName");
                currentName.innerHTML = data.name;

                let currentText = document.createElement("p");
                currentText.setAttribute("class", "currentText");
                currentText.innerHTML = data.desc                

                let text = document.createElement("h3");
                text.innerHTML = newreservation.id
                text.style.textTransform = "capitalize";
                text.style.marginTop = "3vmin";

                container.appendChild(currentName)
                container.appendChild(currentText);
                container.appendChild(text);

                document.querySelector(".currentTexts").appendChild(container);


            })
        })
}

// ! ------------------------------

function loadTextChangers() {
    let db = firebase.firestore();
    picRef = db.collection("newreservation");

    picRef.get()
        .then(newreservations => {
            newreservations.forEach(newreservation => {
                data = newreservation.data();

                let adjuster = document.createElement("div")
                adjuster.setAttribute("class", "adjuster")


                adjuster.style.maxWidth = "90%"
                adjuster.style.maxHeight = "90%"

                let labelName = document.createElement("label")
                labelName.innerHTML = `Változtassa meg a <span style="font-weight: bold; text-transform: capitalize">${newreservation.id}</span> nevét`

                let inputName = document.createElement("input")
                inputName.setAttribute("type", "text")
                inputName.setAttribute("id", `${newreservation.id}Name`)

                let nameContainer = document.createElement("div")

                nameContainer.appendChild(labelName)
                nameContainer.appendChild(inputName)

                

                let labelDesc = document.createElement("label")
                labelDesc.innerHTML = `Változtassa meg a <span style="font-weight: bold; text-transform: capitalize">${newreservation.id}</span> szövegét`

                let inputDesc = document.createElement("input")
                inputDesc.setAttribute("type", "text")
                inputDesc.setAttribute("id", `${newreservation.id}Desc`)



                let descContainer = document.createElement("div")

                descContainer.appendChild(labelDesc)
                descContainer.appendChild(inputDesc)

                
                adjuster.appendChild(nameContainer)
                adjuster.appendChild(descContainer)

                document.querySelector(".changeTexts").appendChild(adjuster)

                let buttonContainer = document.createElement("div")
                buttonContainer.setAttribute("class", "buttonContainer")

                let button = document.createElement("button")
                button.innerHTML = "OK"
                button.setAttribute("id", `${newreservation.id}Button`)

                buttonContainer.appendChild(button)

                document.querySelector(".changeTexts").appendChild(buttonContainer)

                
            })
        })
}

// ! -----------------------------

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

// ! -----------------------------

setTimeout(() => {
    let changeTextInputs = document.querySelectorAll(".changeTexts .adjuster input");
    
    let textButtons = document.querySelectorAll(".changeTexts .buttonContainer button")

    textButtons.forEach(button => {
        button.addEventListener("click", () => {
            if(checkIfInputIsEmpty(button) === false){
                let inputsWithValue = []

                changeTextInputs.forEach(input => {
                    if (input.value != ""){
                        inputsWithValue.push(input)
                    }
                })
    
    
                let type = button.id.replace("Button", "")
    
    
                let db = firebase.firestore()
                db.collection("newreservation").doc(type).update({
                    name: inputsWithValue[0].value,
                    desc: inputsWithValue[1].value,
                }, {merge: true})
                    .then(() => {
                        alert("Sikeres átállítás")
                        removeAllChildNodes(document.querySelector(".currentTexts"))
                        removeAllChildNodes(document.querySelector(".changeTexts"))
                        loadCurrentText();
                        loadTextChangers();
                        
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                        alert("Sikertelen átállítás")
                    });
    
    
    
            }
            else{
                alert("Töltse ki mindkét mezőt a kívánt értékekkel")
            }
        })
    })
}, 2000);

function checkIfInputIsEmpty(button) {
    let name = document.getElementById(`${button.id.replace("Button", "")}Name`)
    let desc = document.getElementById(`${button.id.replace("Button", "")}Desc`)


    if(name.value === "" || desc.value === ""){
        return true
    }
    else{
        return false
    }
}

// ! -----------------------------

function loadCurrentPhones() {
    let db = firebase.firestore();

    db.collection("newreservation").get()
        .then(newreservations => {
            newreservations.forEach(newreservation => {
                let data = newreservation.data();
    
                let container = document.createElement("div");
                container.setAttribute("class", "container");

    
                let currentPhone = document.createElement("h3");
                currentPhone.setAttribute("class", "currentPhone");
                currentPhone.innerHTML = data.phone;         
    
                let text = document.createElement("p");
                text.innerHTML = newreservation.id
                text.style.textTransform = "capitalize";
                text.style.marginTop = "3vmin";
    
                container.appendChild(currentPhone)
                container.appendChild(text);
    
    
                document.querySelector(".currentPhones").appendChild(container);
    
            })
        })
}

// ! -----------------------------

function loadPhoneChangers() {

    let db = firebase.firestore()

    db.collection("newreservation").get().then(newreservations => {
        newreservations.forEach(newreservation => {

            let adjuster = document.createElement("div")
            adjuster.setAttribute("class", "adjuster")

            let label = document.createElement("label")
            label.innerHTML = `Változtassa meg a <span style="font-weight: bold; text-transform: capitalize">${newreservation.id}</span> telefonszámát`

            let input = document.createElement("input")
            input.setAttribute("type", "text")
            input.setAttribute("id", newreservation.id.replace(/ /g , "_"))

            adjuster.style.maxWidth = "90%"
            adjuster.style.maxHeight = "90%"

            adjuster.appendChild(label)
            adjuster.appendChild(input)

            document.querySelector(".changePhones").appendChild(adjuster)

            let buttonContainer = document.createElement("div")
            buttonContainer.setAttribute("class", "buttonContainer")

            let button = document.createElement("button")
            button.innerHTML = "OK"
            button.setAttribute("id", `${newreservation.id}Button`)
            button.setAttribute("onclick", "updatePhone(this.id)")

            buttonContainer.appendChild(button)

            document.querySelector(".changePhones").appendChild(buttonContainer)

        })
    })
}


function updatePhone(id) {
    let buttonId = id.replace("Button", "")

    let input = document.querySelector(`.changePhones #${buttonId.replace(/ /g, "_")}`)

    let db = firebase.firestore()
    db.collection("newreservation").doc(buttonId).update({
        phone: input.value
    }, {merge: true})
        .then(() => {
            alert("Sikeres átállítás")
            removeAllChildNodes(document.querySelector(".currentPhones"))
            removeAllChildNodes(document.querySelector(".changePhones"))
            loadCurrentPhones();
            loadPhoneChangers();
            
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
            alert("Sikertelen átállítás")
        });


}



