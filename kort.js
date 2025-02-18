document.addEventListener("DOMContentLoaded", function () {
  runProgram();
});

async function runProgram() {
  let selected;
  let selectedID;
  let color;
  let active;
  let infoboks;
  let position;

  //hent json
  let jsondata = await fetch("kort.json");
  let objekter = await jsondata.json();

  //1. load svg
  let mySvg = await fetch("assistens.svg");
  let svg = await mySvg.text();

  document.querySelector("#map").innerHTML = svg;

  //2. skift farve ved klik + vis tekst
  document.querySelector("#map #points").addEventListener("click", function (event) {
    clicked(event);
  });

  //function clicked
  function clicked(object) {
    document.querySelector("#info").classList.remove("vis");
    document.querySelector("#rute").classList.remove("animer-rute");
    document.querySelector("#info").style.visibility = "visible";
    objekter.forEach((objekt) => {
      if (infoboks != undefined) {
        infoboks.style.visibility = "hidden";
      }
      console.log(objekt);

      //a. find det klikkede element
      selected = object.target;

      //find elementets placering
      position = selected.getBoundingClientRect();
      console.log(position);
      document.querySelector("#info").style.top = position.bottom + "px";
      document.querySelector("#info").style.left = position.right + "px";
      document.querySelector("#rute").style.display = "block";

      //b. find det klikkede elements id
      selectedID = selected.getAttribute("id");

      //c. find det klikkede elements fillfarve
      color = selected.getAttribute("fill");

      //d. vis info
      if (selectedID == objekt.sted) {
        document.querySelector("#info p").textContent = objekt.tekst;
        document.querySelector("#info").classList.add("vis");
        document.querySelector("#info h2").textContent = objekt.h2;
        document.querySelector("#info img").src = "/img/" + objekt.billede + ".jpg";

        document.querySelector("#rute").classList.add("animer-rute");

        document.querySelector("#info").addEventListener("click", function () {
          document.querySelector("#info").style.visibility = "hidden";

          document.querySelector("#" + selectedID).setAttribute("fill", "#b62300");
          infoboks.style.visibility = "hidden";
        });
      }
    });
    //4. hvis der tidligere har været klikket skal det forrige element skifte farve til original
    if (active != undefined) {
      active.setAttribute("fill", color);
    }

    //gør det klikkede til det aktive
    active = selected;

    //skift farve på det valgte
    if (color === "#b62300") {
      document.querySelector("#" + selectedID).setAttribute("fill", "#123456");
    }

    //reset farve og skjul tekst hvis valgt element allerede er aktivt
    else {
      document.querySelector("#" + selectedID).setAttribute("fill", "#b62300");
      document.querySelector("#info").style.visibility = "hidden";
      /*  infoboks.style.visibility = "hidden"; */
    }
  }
}
