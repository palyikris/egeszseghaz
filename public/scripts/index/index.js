
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


// ! ---------------------------------------------------------------------------------------

function toSecondPage(){
    window.location.href="../../pages/wip.html"
}

// ! ------------------------------------------------------------------

function toThirdPage(){
    window.location.href="/index.html#services"
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
    let pages = document.querySelectorAll(".page");
    pages.forEach(page => {
        page.style.display = "none";
    })
    document.getElementById("first").style.display = "flex";
    let spans = document.querySelectorAll(".topnav button span")
    spans.forEach(span => {
        span.style.width = "0";
    })
    document.getElementById("topnavSpan").style.width = "100%"
}

// ! ------------------------------------------------

let navicon = document.querySelector(".topnavOpener i");

navicon.addEventListener("click", () => {
    if (document.querySelector(".topnav").style.display == "none") {
        document.querySelector(".topnav").style.display = "flex"
    }
    else{
        document.querySelector(".topnav").style.display = "none"
    }
})

// ! firebase script


function zoom(bg){

    let modal = document.createElement("div")
    modal.setAttribute("class", "modal")
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

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector(".popupContainer").style.display = "flex"
})

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

let i = 0;
let j = 0;
document.addEventListener("scroll", () => {
    if(isInViewport(document.querySelector(".separator"))){
        document.querySelector(".separator").style.width = `${i}%`
        if(i < 60){
            i+=1
        }
        else{

        }
        
    }
    else{
        i = 0;
        document.querySelector(".separator").style.width = `${i}%`
    }


    if(isInViewport(document.querySelector(".separator1"))){
        document.querySelector(".separator1").style.width = `${j}%`
        if(j < 60){
            j+=1
        }
        else{

        }
        
    }
    else{
        j = 0;
        document.querySelector(".separator1").style.width = `${j}%`
    }

    // if(isInViewport(document.querySelector("#img1")) || isInViewport(document.querySelector("#img2"))){
    //     document.querySelectorAll(".imgs .img").forEach(img => {
    //         img.style.transform = `rotateZ(${j}deg)`
    //         j+=1
    //     })
    // }
    // else{
    //     j = 0
    //     document.querySelectorAll(".imgs .img").forEach(img => {
    //         img.style.transform = `rotateZ(${j}deg)`
    //     })
    // }
    
})