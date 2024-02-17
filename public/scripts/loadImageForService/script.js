

document.addEventListener('DOMContentLoaded', () => {
    let app = firebase.app();
    let db = firebase.firestore();

    let slideshow = document.querySelector('.slideShow');
    console.log(slideshow)
    if(slideshow.children.length === 0){

        console.log('yes')
        let url_string = window.location;
        let url = new URL(url_string);
        let selected = url.searchParams.get("selected")

        db.collection("newreservation").doc(selected).get().then(doc => {
            let image = document.createElement("div")
            image.classList.add("img")
            image.style.background = `url('${doc.data().img}')`
            image.style.backgroundRepeat = "no-repeat"
            image.style.backgroundSize = "cover"
            image.style.backgroundPosition = "center"
            image.style.opacity = "1"
            slideshow.appendChild(image)
        })
    }
    else{

    }
})