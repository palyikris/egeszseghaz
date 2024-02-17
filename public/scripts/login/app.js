document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    let db = firebase.firestore();


});

function login(){
    let db = firebase.firestore();

    let loginRef = db.collection("login").doc("data")

    loginRef.get()
        .then(res => {
            data = res.data();
            let uname = document.getElementById("uname").value;
            let password = document.getElementById("password").value;

            if(data.uname === uname && data.pwd === password){
                window.location.href = "admin.html"
            }
            else{
              alert("Sikertelen belépés")
            }
        })
}


document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    document.querySelector(".buttonContainer button").click();
  }
});