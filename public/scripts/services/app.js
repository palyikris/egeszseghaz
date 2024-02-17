console.log("Starting");

document.addEventListener("DOMContentLoaded", (event) => {
  const app = firebase.app();
  let db = firebase.firestore();

  loadSearchItems();

  setTimeout(() => {
    if (selected === undefined || selected === "") {
      console.log("Please select a search");
    } else {
      document.getElementById("search").value = selected;
      console.log(document.querySelectorAll(".searches"));
      document.querySelectorAll(".searches").forEach((searchItem) => {
        console.log(searchItem);
        if (
          searchItem.id.toLowerCase().includes(selected.toLowerCase()) === true
        ) {
        } else {
          searchItem.style.display = "none";
        }
      });
    }
  }, 500);
});

function englishify(img) {
  img = img.replace("á", "a");
  img = img.replace("é", "e");
  img = img.replace("í", "i");
  img = img.replace("/ö|ő|ó/g", "o");
  img = img.replace("/ű|ú|ü/g", "u");

  return `${img}.jpg`;
}

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
function checkDisplayedChildNodes(parent) {
  let childNodes = 0;
  for (let i = 0; i < parent.children.length; i++) {
    if (parent.children[i].style.display != "none") {
      childNodes++;
    }
  }
  return childNodes;
}

document.querySelector("#search").addEventListener("input", () => {
  if (document.querySelectorAll(".searches").length != 0) {
    document.querySelectorAll(".searchBlocks .searches").forEach((search) => {
      search.style.display = "none";
    });

    let value = document.querySelector("#search").value;

    let searches = document.querySelectorAll(".searchBlocks .searches");

    searches.forEach((search) => {
      if (search.id.includes(value.toLowerCase())) {
        search.style.display = "inline-block";
      }
    });
  }
});

function loadService(id) {
  window.location.href = `../../pages/services/${id}.html?selected=${id}`;
}

let url_string = window.location;
let url = new URL(url_string);
let selected = url.searchParams.get("selected");

function selectSearch() {
  if (document.querySelector("#search").value != "") {
    console.log("bum");
    document.querySelectorAll(".searchBlocks .searches").forEach((search) => {
      console.log(search);
      if (
        search.id.toLowerCase() ===
        document.querySelector("#search").value.toLowerCase()
      ) {
      } else {
        search.style.display = "none";
      }
    });
  }
}

topnavOption.addEventListener("mouseover", () => {
  document.getElementById("topnavSpan").style.width = "100%";
});
topnavOption.addEventListener("mouseout", () => {
  document.getElementById("topnavSpan").style.width = "0%";
});

// ! --------------------------------------------------------------

topnavOption1.addEventListener("mouseover", () => {
  document.getElementById("topnavSpan1").style.width = "100%";
});
topnavOption1.addEventListener("mouseout", () => {
  document.getElementById("topnavSpan1").style.width = "0%";
});

// ! ---------------------------------------------------------------

topnavOption2.addEventListener("mouseover", () => {
  document.getElementById("topnavSpan2").style.width = "100%";
});
topnavOption2.addEventListener("mouseout", () => {
  document.getElementById("topnavSpan2").style.width = "0%";
});

// ! -------------------------------------------------------------

topnavOption3.addEventListener("mouseover", () => {
  document.getElementById("topnavSpan3").style.width = "100%";
});
topnavOption3.addEventListener("mouseout", () => {
  document.getElementById("topnavSpan3").style.width = "0%";
});

// ! ------------------------------------------------------------

topnavOption4.addEventListener("mouseover", () => {
  document.getElementById("topnavSpan4").style.width = "100%";
});
topnavOption4.addEventListener("mouseout", () => {
  document.getElementById("topnavSpan4").style.width = "0%";
});

// ! ------------------------------------------------------------

navicon.addEventListener("click", () => {
  if (document.querySelector(".topnav").style.display == "none") {
    document.querySelector(".topnav").style.display = "flex";
  } else {
    document.querySelector(".topnav").style.display = "none";
  }
});

function toSecondPage() {
  window.location.href = "../../pages/wip.html";
}

// ! ------------------------------------------------------------------

function toThirdPage() {
  window.location.href = "../../pages/services.html";
}

// ! -------------------------------------------------------------------------

function toFourthPage() {
  window.location.href = "../../pages/newreservation.html";
}

// ! -------------------------------------------------------------------

function toFifthPage() {
  window.location.href = "../../pages/login.html";
}

// ! -------------------------------------------------------------------

function toFirstPage() {
  window.location.href = "../../index.html";
}

function loadSearchItems() {
  let db = firebase.firestore();

  console.error("nah");

  db.collection("newreservation")
    .get()
    .then((docs) => {
      docs.forEach((doc) => {
        let search = document.createElement("div");
        search.setAttribute("id", doc.id);
        search.setAttribute("class", "searches");
        search.setAttribute("onclick", "loadService(this.id)");
        search.innerHTML = doc.id;

        document.querySelector(".searchBlocks").appendChild(search);
      });

      document.querySelector(".container").style.display = "none";
      document.querySelectorAll(".searches").forEach((search) => {
        search.style.display = "inline-block";
      });
    });
}
