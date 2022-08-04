const searchBarre = document.getElementById("searchInput");

function filtreBarre() {
    const inputBarre = searchBarre.value;
    let resultat = [];
    recettes = recipes;

    if (inputBarre.length >= 3) {

        for (let i = 0; i < dictionner.length; i++) {
            if (dictionner[i].key.toLowerCase().includes(inputBarre.toLowerCase())) {
                let existe = false;
                for (let index = 0; index < resultat.length; index++) {
                    const element = resultat[index];
                    if (element.id === dictionner[i].value.id) {
                        existe = true;
                        break;
                    }
                }
                if (!existe) {
                    resultat.push(dictionner[i].value);
                }


            }
        }

    } else {
        recettes = recipes;
        filtreTag();
        resultat = recettes;
    }
    if (resultat.length == 0) {
        pasDeRecette();

    } else {
        displayRecette(resultat);
    }
    displayListe(resultat);

}
searchBarre.addEventListener("input", filtreBarre);