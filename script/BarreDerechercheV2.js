const searchBarre = document.getElementById("searchInput");

function filtreBarre() {
    const inputBarre = searchBarre.value;
    let resultat = [];
    recettes = recipes;

    if (inputBarre.length >= 3) {

        dictionner.forEach(item => {
            if (item.key.toLowerCase().includes(inputBarre.toLowerCase()) && !resultat.includes(item.value)) {
                resultat.push(item.value);

            }
        })

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