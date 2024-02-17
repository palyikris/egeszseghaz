document.addEventListener("DOMContentLoaded", () => {


    const app = firebase.app();
    let db = firebase.firestore();


    loadSelectItems()

})


function submitTimeTable(){
    
    let workdays = getWorkdays()
    
    function getWorkdays(){
        let days = document.querySelectorAll(".weekday input");
        let workdays = [];
    
        days.forEach(day => {
            if(day.checked === true) {
                workdays.push(day.name)
            }
        })
    
        return workdays;
    }
    

// ! ----------------------------- get workdays -----------------------------


}

function loadSelectItems(){

    let db = firebase.firestore()

    let typeRef = db.collection("newreservation")

    let option = document.createElement("option")
    option.value = "default"
    option.innerHTML = "Válasszon szolgáltatást!"


    document.getElementById("selectItem").appendChild(option)
    
    typeRef.get()
        .then(newreservations => {
            newreservations.forEach(reservation => {

                let option = document.createElement("option")
                option.value = reservation.id
                option.innerHTML = reservation.id


                document.getElementById("selectItem").appendChild(option)

            })
        })
    

}

setTimeout(() => {
    
    document.querySelector(".lds-hourglass").style.display = "none";
    document.querySelector("#selectItem").style.display = "inline-block"

}, 1500);

// ! ----------------------------- load options for select of type -----------------------------


function loadExceptions() {
    let exceptions = document.createElement("div");
    exceptions.setAttribute("class", "exceptions");



    let day = document.createElement("div");
    day.setAttribute("class", "day");
    let label = document.createElement("label");
    label.innerHTML = "Írd meg, hogy melyik nap nem jó!";
    let input = document.createElement("input");
    input.placeholder = "Pl.: Hétfő";
    input.type = "text";
    day.appendChild(label);
    day.appendChild(input)
    exceptions.appendChild(day);

    let hour = document.createElement("div");
    hour.setAttribute("class", "hour");
    let labelHour = document.createElement("label");
    labelHour.innerHTML = "Itt válassza ki, hogy hány órától hány óráig nem jó";
    let fromInput = document.createElement("input");
    fromInput.type = "time";
    let toInput = document.createElement("input");
    toInput.type = "time";
    let span = document.createElement("span");
    span.innerHTML = "-"
    hour.appendChild(labelHour)
    hour.appendChild(fromInput)
    hour.appendChild(span)
    hour.appendChild(toInput)
    exceptions.appendChild(hour)

    let addNewExceptions = document.createElement("button")
    addNewExceptions.setAttribute("class", "addNewExceptions")
    addNewExceptions.innerHTML = "+";
    addNewExceptions.setAttribute("onclick", "loadExceptions()")
    exceptions.appendChild(addNewExceptions)


    document.getElementById("exceptionHolder").appendChild(exceptions)
}

document.getElementById("exceptions").addEventListener("change", () => {

    if(document.getElementById("exceptions").checked) {
        loadExceptions()
    }
    else{
        document.querySelectorAll(".exceptions").forEach(exception => {
            exception.remove()
        })
    }

})


// ! ----------------------------- load exceptions for timetables ----------------


function submit() {
    function getFormData() {

        let selectValue = document.getElementById("selectItem").value;
        
        if(selectValue === "default") {
            alert("Válasszon szolgáltatást!")
        }
        else{

            let formData = {}


            // TODO: this is the value of the select element
            let selectValue = document.getElementById("selectItem").value;
            formData.type = selectValue;

            function getWeekdayInputs() {
                let weekdayInputs = document.querySelectorAll(".weekday input");
                let chosenDays = []
                weekdayInputs.forEach(input => {
                    if(input.checked === true){
                        chosenDays.push(input.name)
                    }
                })
                return chosenDays
            }
    
            // TODO: this is the value of the weekday input elements
            let chosenDays = getWeekdayInputs()
            formData.workdays = chosenDays

            // TODO: this is the value of the hour steps input elements
            let steps = document.getElementById("steps").value;
            formData.steps = steps




            function getExceptions() {
                let days = []
                document.querySelectorAll(".exceptions .day input").forEach(input => {
                    days.push(input.value)
                })

                let fromHour = []
                document.querySelectorAll(".exceptions .hour input:nth-of-type(1)").forEach(input => {
                    fromHour.push(input.value)
                })

                let toHour = []
                document.querySelectorAll(".exceptions .hour input:nth-of-type(2)").forEach(input => {
                    toHour.push(input.value)
                })

                let exceptions = []

                for (let i = 0; i < days.length; i++) {
                    let exception = {}

                    exception.day = days[i]
                    exception.from = fromHour[i]
                    exception.to = toHour[i]

                    exceptions.push(exception)
                }

                // TODO: this is the value of the exception elements
                formData.exceptions = exceptions

                return exceptions
            }

            let exceptions = getExceptions()
            formData.exceptions = exceptions
            

            return formData
        }

        
    }

    let formData = getFormData()


    function uploadFormData(formData) {

        let type = formData.type
        let workdays = formData.workdays
        let steps = formData.steps
        let exceptions = formData.exceptions

        let db = firebase.firestore()
        db.collection("timeTable").doc(`${type}Timetable`).set({
            type: type,
            workdays: workdays,
            steps: steps,
            exceptions: exceptions,
        })
            .then(() => {
                alert("Sikeres feltöltés")
            })
            .catch((error) => {
                console.error(error)
            })

    }

    uploadFormData(formData)


    

}


// ! ----------------------------- submit and upload timetable ----------------


