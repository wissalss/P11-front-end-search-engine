let tabIngredients;
let tabUstensiles;
let tabAppareils;

//   Tableaux Btn FILTRE

function creaListeFiltre(recettesParam) {
    tabIngredients = [];
    tabUstensiles = [];
    tabAppareils = [];

    recettesParam.forEach(recette => {

        recette.ingredients.map((ingredient) => {
            tabIngredients.push(ingredient.ingredient);
        });
        recette.ustensils.map((ustensile) => {
            tabUstensiles.push(ustensile);
        });
        tabAppareils.push(recette.appliance);
    });

    //trie pour delet les plus    
    tabIngredients = [...new Set(tabIngredients)].sort();
    tabUstensiles = [...new Set(tabUstensiles)].sort();
    tabAppareils = [...new Set(tabAppareils)].sort();

}


//          CREATION DES LISTES BOUTONS FILTRE

function creaListeDom(tabTag, id) {

    const divListe = document.getElementById(id + "_div");
    divListe.innerHTML = "";

    const ul = document.createElement("ul");
    ul.id = id;

    divListe.appendChild(ul);

    tabTag.forEach(e => {
        const li = document.createElement("li");
        li.className = "li_" + id;
        li.innerHTML = e;
        ul.appendChild(li)
    });
}


//              RECHERCHE AVEC BOUTON FILTRE
let suggestion = "";

function filtreBtn(tabTag, id) {
    const inputBtn = document.getElementById("input_" + id);

    const inputBarre = inputBtn.value;

    if (inputBarre.length >= 1) {
        const resultFiltre = tabTag.filter(el => el.toLowerCase().startsWith(inputBarre.toLowerCase()));

        suggestion = "";
        resultFiltre.forEach(el =>
            suggestion += `
            <li class = li_choix_${id}, value = "${el}">${el}</li>`
        )

        document.getElementById(id).innerHTML = suggestion;

    } else {
        creaListeDom(tabTag, id);
    }
    inputBtn.addEventListener("input", displayFiltreBtn);

}

// Tags Selectionnés 


const divListeIng = document.getElementById("ingredients_div");
const divListeApp = document.getElementById("appareils_div");
const divListeUst = document.getElementById("ustensiles_div");

var ulTag = document.getElementById("tag");

function creaTagDom(e, id) {
    const liTag = document.createElement("li");
    liTag.className = "li_" + id;
    liTag.id = "li_" + e.target.textContent;

    const spanTag = document.createElement("span");
    spanTag.className = "span_" + id;

    const iTag = document.createElement("i");
    iTag.className = "far fa-times-circle";
    iTag.id = "close_" + e.target.textContent;
    iTag.onclick = closeTag;

    spanTag.innerHTML = e.target.textContent;

    liTag.appendChild(spanTag);
    liTag.appendChild(iTag);
    ulTag.appendChild(liTag);

}

// Delet tag 

function closeTag(e) {

    ulTag.removeChild(e.target.parentNode);
    tabIng.splice(e);
    tabApp.splice(e);
    tabUst.splice(e);

    recettes = recipes;

    filtreTag();
    filtreBarre();

    displayRecette(recettes);
    displayListe(recettes);
}

//Filtre entre les tags et les recettes

// tableau vide des tags
var tabUst = [];
var tabApp = [];
var tabIng = [];

function filtreTag() {
    // à zéro des tableau des tags
    tabUst = [];
    tabApp = [];
    tabIng = [];

    //récupère le li qui est contenu dans ultag(element enfant)
    Array.from(ulTag.children).forEach(e => {
        if (e.children[0].className == "span_ustensiles") {
            //si l'element enfant à la class span_ustensiles
            tabUst.push(e.children[0].textContent.toLowerCase());
            //je le mets dans le tableau des ustensiles
        }
        if (e.children[0].className == "span_appareils") {
            tabApp.push(e.children[0].textContent.toLowerCase());
        }

        if (e.children[0].className == "span_ingredients") {
            tabIng.push(e.children[0].textContent.toLowerCase());
        }
    })


    if (ulTag.childElementCount > 0) {

        //si ultag contient quelque chose
        resultatTag = recettes.filter(recette => {
            return (
                tabApp.every(app => recette.appliance.toLowerCase().includes(app)) &&
                tabUst.every(ust => recette.ustensils.some((ustensile) => ustensile.toLowerCase().includes(ust))) &&
                tabIng.every(ing => recette.ingredients.some((ingredient) => ingredient.ingredient.toLowerCase().includes(ing)))

            )
        });

        recettes = resultatTag;
    } else {
        resultatTag = recettes;
    }
    displayRecette(resultatTag);
    displayListe(resultatTag);
}


//evenement au click sur un mot de la liste
divListeIng.addEventListener("click", (e) => {

    if (tabIng.includes(e.target.textContent.toLowerCase())) {

    } else {
        creaTagDom(e, "ingredients");
        filtreTag();
    }
});

divListeUst.addEventListener("click", (e) => {

    if (tabUst.includes(e.target.textContent.toLowerCase())) {

    } else {
        creaTagDom(e, "ustensiles");
        filtreTag();
    }
});

divListeApp.addEventListener("click", (e) => {

    if (tabApp.includes(e.target.textContent.toLowerCase())) {

    } else {
        creaTagDom(e, "appareils");
        filtreTag();
    }
});





// OUVERTURE DES LISTES
const openBtnIngredient = document.getElementById("ingredients-down");
const openBtnAppareil = document.getElementById("appareils-down");
const openBtnUstensile = document.getElementById("ustensiles-down");
const btnIngredient = document.querySelector(".ingredients_btn");
const btnAppareil = document.querySelector(".appareils_btn");
const btnUstensile = document.querySelector(".ustensiles_btn");
const ListeIngredients = document.querySelector(".liste_ingredients");
const ListeAppareils = document.querySelector(".liste_appareils");
const ListeUstensiles = document.querySelector(".liste_ustensiles");

openBtnIngredient.addEventListener("click", openListeIngredients);

function openListeIngredients() {
    openBtnIngredient.style.display = "none";
    ListeIngredients.style.display = "block";
    ListeAppareils.style.display = "none";
    ListeUstensiles.style.display = "none";
    openBtnAppareil.style.display = "block";
    openBtnUstensile.style.display = "block";
    btnAppareil.style.transform = "translateX(350px)";
    btnUstensile.style.transform = "translateX(300px)";
}

openBtnAppareil.addEventListener("click", openListeAppareils);

function openListeAppareils() {
    openBtnAppareil.style.display = "none";
    ListeAppareils.style.display = "block";
    ListeIngredients.style.display = "none";
    ListeUstensiles.style.display = "none";
    openBtnIngredient.style.display = "block";
    openBtnUstensile.style.display = "block";
    btnUstensile.style.transform = "translateX(370px)";
    btnAppareil.style.transform = "translateX(0px)";
}

openBtnUstensile.addEventListener("click", openListeUstensiles);

function openListeUstensiles() {
    openBtnUstensile.style.display = "none";
    ListeUstensiles.style.display = "block";
    ListeIngredients.style.display = "none";
    ListeAppareils.style.display = "none";
    openBtnIngredient.style.display = "block";
    openBtnAppareil.style.display = "block";
    btnAppareil.style.transform = "translateX(-10px)";
}



// Close the list 
const closeIngredient = document.getElementById("ingredients-up");
const closeAppareil = document.getElementById("appareils-up");
const closeUstensile = document.getElementById("ustensiles-up");

closeIngredient.addEventListener("click", closeListeIngredients);

function closeListeIngredients() {
    openBtnIngredient.style.display = "block";
    ListeIngredients.style.display = "none";
    btnAppareil.style.transform = "translateX(0)";
    btnUstensile.style.transform = "translateX(0)";
}

closeAppareil.addEventListener("click", closeListeAppareils);

function closeListeAppareils() {
    openBtnAppareil.style.display = "block";
    ListeAppareils.style.display = "none";
    btnUstensile.style.transform = "translateX(0)";
}

closeUstensile.addEventListener("click", closeListeUstensiles);

function closeListeUstensiles() {
    openBtnUstensile.style.display = "block";
    ListeUstensiles.style.display = "none";
    btnUstensile.style.transform = "translateX(0)";
}