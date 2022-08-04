//Renseigne la fonction creaListeDom pour les paramètres
function displayListe(recette) {
    creaListeFiltre(recette);
    creaListeDom(tabIngredients, "ingredients");
    creaListeDom(tabAppareils, "appareils");
    creaListeDom(tabUstensiles, "ustensiles");
}

//Renseigne la fonction filtreBtn pour les paramètres
function displayFiltreBtn() {
    filtreBtn(tabIngredients, "ingredients");
    filtreBtn(tabAppareils, "appareils");
    filtreBtn(tabUstensiles, "ustensiles");
}

var cartesRecettes = document.querySelector(".result");

function pasDeRecette() {
    cartesRecettes.innerHTML = "";

    const divnull = document.createElement("div");
    divnull.id = "pas_de_recette";
    divnull.textContent = 'Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc,'

    cartesRecettes.appendChild(divnull);
}

function displayRecette(recettes) {
    cartesRecettes.innerHTML = "";

    recettes.forEach(recette => {
        const creaData = new dataRecettes(recette);
        const creaCarte = creaData.creaCarteDom();
        cartesRecettes.appendChild(creaCarte);
        creationDic(recette);
    });
}

var recettes = recipes;
var dictionner = []

async function creationDic(recette) {
    dictionner.push({ key: recette.name, value: recette })
    dictionner.push({ key: recette.description, value: recette })
    dictionner.push({ key: recette.appliance, value: recette })
    recette.ustensils.forEach(element => {
        dictionner.push({ key: element, value: recette })
    });
    recette.ingredients.forEach(element => {
        dictionner.push({ key: element.ingredient, value: recette })
    });

}

function init() {
    displayRecette(recettes);
    displayListe(recettes);
    displayFiltreBtn();
}

init();