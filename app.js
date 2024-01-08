const formulario = document.getElementById("busqueda");
const inputSearch = document.getElementById("nombre");
const divResultados = document.querySelector(".resultados");
const urlCharacters = "https://gateway.marvel.com/v1/public/characters"
const urlComics = "https://gateway.marvel.com/v1/public/comics"
const urlEvents = "https://gateway.marvel.com/v1/public/events"

//generamos con ts + privatekey + apikey
const ts = "1"
const apikey = "cbcd371a49382c778dacbc6fbe477063"
const privateKey = "a5336fb42847ebb86e7e2292dde33bde2c28b4e0"
const hash = "d74de197814f4d542f0126e5744f71c8"
const templateCard = document.getElementById("template-card").content;
const btnLeft = document.querySelector("#left")
const btnRight = document.querySelector("#right")
const inputPage = document.querySelector("#inputPage")
const labelPage = document.querySelector("#labelPage")
const filterSelect = document.querySelector("#filtrado") //personajes , eventos y comic
const searchSelected = document.querySelector("#tipoBusqueda") //comic o personajes

//para la paginacion (offset y pagina)
let offset = 0
let pagina = 1
let btnN;
let btnP;

//almacena el tipo de búsqueda seleccionado en un elemento <select>.
let tipoBusqueda = searchSelected.options[searchSelected.selectedIndex].value

//creamos un fragmento
const fragment = document.createDocumentFragment();

//Distintas formas de llamar a la API
async function getAllCharacters() {
    //? es el comienzo de la cadenagit commit -m "first commit"
    //& para saperar los elementos
    const urlFetch = urlCharacters + "?ts=" + ts + "&apikey=" + apikey + "&hash=" + hash + "&offset=" + offset
    console.log(urlFetch)
   // Se realiza la solicitud a la URL utilizando la función fetch. 
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}
async function getCharacterById(id) {
    //separador de rutas
    const urlFetch = urlCharacters + "/" + id + "?ts=" + ts + "&apikey=" + apikey + "&hash=" + hash + "&offset=" + offset
    console.log(urlFetch)
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;

}
async function getAllComics() {
    const urlFetch = urlComics + "?ts=" + ts + "&apikey=" + apikey + "&hash=" + hash + "&offset=" + offset
    console.log(urlFetch)
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
    62304
}
async function getComicById(id) {
    const urlFetch = urlComics + "/" + id + "?ts=" + ts + "&apikey=" + apikey + "&hash=" + hash + "&offset=" + offset
    console.log(urlFetch)
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;

}
async function getCharactersByNameStartsWith(name) {
    //nameStartsWith es un filtro
    const urlFetch = urlCharacters + "?nameStartsWith=" + name + "&ts=" + ts + "&apikey="
        + apikey + "&hash=" + hash + "&offset=" + offset;
    console.log(urlFetch)
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}
async function getCharactersByComicsNameStartsWith(title) {
    const urlFetch = urlComics + "?titleStartsWith=" + title + "&ts=" + ts + "&apikey="
        + apikey + "&hash=" + hash + "&offset=" + offset + "&limit=20";
    console.log(urlFetch)
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}
async function getCharactersByEventsNameStartsWith(eventsName) {
    const urlFetch = urlEvents + "?nameStartsWith=" + eventsName + "&ts=" + ts + "&apikey="
        + apikey + "&hash=" + hash + "&offset=" + offset + "&limit=20";
    console.log(urlFetch)
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}
async function getComicsTitleStartWith(name) {
    const urlFetch = urlComics + "?titleStartsWith=" + name + "&ts=" + ts + "&apikey="
        + apikey + "&hash=" + hash + "&offset=" + offset;
    console.log(urlFetch)
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}
async function getWithUrlNoKey(url) {
    const urlFetch = url + "?ts=" + ts + "&apikey=" + apikey + "&hash=" + hash;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}
//Distintos eventos de cargan de datos
window.addEventListener("load", e => {
    getAllCharacters(offset)
        .then(results => {
            crearBtn(results)
            console.log(results)
        });
})
formulario.addEventListener("submit", e => {
    e.preventDefault();
});
filterSelect.addEventListener("blur", e => {
    limpiarPersonajes()
    inputSearch.value = ""
    normalCallCharacters()
})
inputSearch.addEventListener("keyup", e => {
    tipoBusqueda = searchSelected.options[searchSelected.selectedIndex].value
    let selectedOption = filterSelect.options[filterSelect.selectedIndex].value
    pagina = 1
    offset = 0
    switch (tipoBusqueda) {
        case "personajes":
            if (selectedOption == "nombre") {
                normalCallCharacters()
            }
            break;
        case "comics":
            normalCallComics()
            //idCallComics()
            break
        default:
            break;
    }

})
inputSearch.addEventListener("blur", e => {
    let selectedOption = filterSelect.options[filterSelect.selectedIndex].value
    switch (selectedOption) {
        case "comics":
            callCharactersByComics()
            break;
        case "eventos":
            callCharactersByEvents()
            break;
    }
})
inputPage.addEventListener("blur", e => {
    pagina = parseInt(inputPage.value)
    let textoTotalPaginas = labelPage.textContent
    tipoBusqueda = searchSelected.options[searchSelected.selectedIndex].value
    //.match devuelve un array de las coincidencias con la expresion regular
    //la expresion regular busca numeros
    let totalPaginas = (textoTotalPaginas.match(/\d+/))[0]
    if (pagina > totalPaginas || pagina <= 0 || isNaN(pagina)) {
        pagina = 1
        offset = pagina * 20 - 20
        switch (tipoBusqueda) {
            case "personajes":
                normalCallCharacters()
                break;
            case "comics":
                normalCallComics()
                break
            default:
                break;
        }
    } else {
        offset = pagina * 20 - 20
        switch (tipoBusqueda) {
            case "personajes":
                normalCallCharacters()
                break;
            case "comics":
                normalCallComics()
                break
            default:
                break;
        }
    }
})
buttons.addEventListener("click", e => {
    e.preventDefault()
    tipoBusqueda = searchSelected.options[searchSelected.selectedIndex].value

    switch (tipoBusqueda) {
        case "personajes":
            if (e.target.classList.contains("next")) {
                pagina += 1
                offset += 20
                normalCallCharacters()
            }
            if (e.target.classList.contains("prev")) {
                pagina -= 1
                offset -= 20
                normalCallCharacters()

            }
            break;
        case "comics":
            if (e.target.classList.contains("next")) {
                pagina += 1
                offset += 20
                normalCallComics()
            }
            if (e.target.classList.contains("prev")) {
                pagina -= 1
                offset -= 20
                normalCallComics()

            }
            break
        default:
            break;
    }

})
divResultados.addEventListener("click", e => {
    if (e.target.tagName === "LI") {
        let tipo = e.target.parentElement.id
        let url = e.target.dataset.url
        let nombre = e.target.textContent
        switch (tipo) {
            case "comics":
                //quitamos el caracter 0 que es el guion y quitamos los espacios
                nombre = nombre.slice(1).trim()
                //split devuelve un array y cogemos el ultimo trozo     Se obtiene el ID del comic a partir de la URL.
                let idComic = url.split("/")[url.split("/").length - 1]
                inputSearch.value = nombre
                searchSelected.value = "comics"
                idCallComics(idComic)
                break;
            case "personajes":
                //quitamos el caracter 0 que es el guion y quitamos los espacios
                nombre = nombre.slice(1).trim()
                //split devuelve un array y cogemos el ultimo trozo
                let idPersonaje = url.split("/")[url.split("/").length - 1]
                inputSearch.value = nombre
                searchSelected.value = "personajes"
                //llamamos a la funcion
                idCallCharacters(idPersonaje)
                console.log(nombre)
                console.log(idPersonaje)
                break
            default:
                break;
        }

    }
})

searchSelected.addEventListener("blur", e => {
    tipoBusqueda = searchSelected.options[searchSelected.selectedIndex].value
    inputSearch.value = ""
    switch (tipoBusqueda) {
        case "personajes":
            if (filterSelect.disabled == true) {
                filterSelect.disabled = false
                filterSelect.value = "nombre"
            }
            normalCallCharacters()
            break
        case "comics":
            filterSelect.disabled = true
            filterSelect.value = "nombre"
            normalCallComics()
            // idCallComics()
            break;

        default:
            break;
    }
})
//Funciones para pintar los personajes y los botones
function selectCharactersFromEvents(response) {
    let contador = 0
    let charactersList = []
    response.data.results.forEach(event => {
        if (event.characters.available == 0) {
        } else {
            eventName = event.title
            event.characters.items.forEach(characters => {
                contador++
                let url = characters.resourceURI
                if (!(charactersList.includes(url))) {
                    let nombreEvento = eventName
                    charactersList.push(url)
                    if (contador <= 20) {
                        getWithUrlNoKey(url)
                            .then(results => {
                                crearBtn(results, nombreEvento)
                            })
                    }
                }
            })
        }
    })
}
function selectCharactersFromComics(response) {
    //intento de meterle paginacion
    // let charactersList = []
    // let numeroPersonajes = 0
    // let contador = 0
    // let title
    // response.data.results.forEach(comic => {
    //     if (comic.characters.available == 0) {
    //     } else {
    //         title = comic.title
    //         comic.characters.items.forEach(characters => {
    //             let url = characters.resourceURI
    //             if (!(charactersList.includes(url))) {
    //                 numeroPersonajes++
    //                 charactersList.push(url)
    //             }
    //         })
    //     }
    // })
    // let numeroPaginas = Math.ceil(numeroPersonajes / 20)
    // charactersList.forEach(url => {
    //     console.log(url)
    //     contador++
    //     if (contador <= 20) {
    //         getWithUrlNoKey(url)
    //             .then(results => {
    //                 crearBtnComics(results, title, numeroPaginas,)
    //             })
    //     }

    // })
    // console.log(charactersList)
    // console.log(numeroPersonajes)

    let charactersList = []
    response.data.results.forEach(comic => {
        if (comic.characters.available == 0) {
        } else {
            title = comic.title
            comic.characters.items.forEach(characters => {
                let url = characters.resourceURI
                if (!(charactersList.includes(url))) {
                    let titulo = title
                    charactersList.push(url)
                    getWithUrlNoKey(url)
                        .then(results => {
                            crearBtn(results, titulo)
                        })
                }
            })
        }
    })
}
function printCharacters(response, eventName) {
    response.data.results.forEach(personaje => {
        templateCard.querySelector("#personajes").style.display = "none"
        templateCard.querySelector("#comics").style.display = "block"
        templateCard.querySelector("img").setAttribute("src", personaje.thumbnail.path + "." + personaje.thumbnail.extension)
        templateCard.querySelector("img").setAttribute("alt", personaje.name)
        templateCard.querySelector("h5").textContent = personaje.name
        templateCard.querySelector("#id").textContent = "Id: " + personaje.id
        let numComics = personaje.comics.returned
        //añadiendo los comics
        if (numComics == 0) {
            templateCard.querySelector("#comics").style.display = "none"
        }
        let listaLiComics = templateCard.querySelectorAll("#comics > li")
        listaLiComics.forEach(li => {
            li.style.display = "block"
        })
        for (let i = 0; i < listaLiComics.length; i++) {
            if (numComics > i) {
                templateCard.querySelector("#comics").style.display = "block"
                listaLiComics[i].textContent = "- " + personaje.comics.items[i].name
                listaLiComics[i].dataset.url = personaje.comics.items[i].resourceURI
                //listaLiComics[i].parentNode.href = listaLiComics[i].dataset.url + "?ts=" + ts + "&apikey=" + apikey + "&hash=" + hash
            } else {
                listaLiComics[i].style.display = "none"
            }
        }
        //añadiendo las series
        let numSeries = personaje.series.returned
        if (numSeries == 0) {
            templateCard.querySelector("#series").style.display = "none"
        }
        let listaLiSeries = templateCard.querySelectorAll("#series > li")
        listaLiSeries.forEach(li => {
            li.style.display = "block"
        })
        for (let i = 0; i < listaLiSeries.length; i++) {
            if (numSeries > i) {
                templateCard.querySelector("#series").style.display = "block"
                listaLiSeries[i].textContent = "- " + personaje.series.items[i].name
                listaLiSeries[i].dataset.url = personaje.series.items[i].resourceURI
                //listaLiSeries[i].parentNode.href = listaLiSeries[i].dataset.url + "?ts=" + ts + "&apikey=" + apikey + "&hash=" + hash
            } else {
                listaLiSeries[i].style.display = "none"
            }
        }

        titulo = eventName != undefined ? templateCard.querySelector("#title").textContent = eventName : ""
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);

    })
    divResultados.appendChild(fragment)
}
function printComics(response) {
    response.data.results.forEach(comic => {
        templateCard.querySelector("#series").style.display = "none"
        templateCard.querySelector("#comics").style.display = "none"
        templateCard.querySelector("#personajes").style.display = "block"
        templateCard.querySelector("img").setAttribute("src", comic.thumbnail.path + "." + comic.thumbnail.extension)
        templateCard.querySelector("img").setAttribute("alt", comic.title)
        templateCard.querySelector("h5").textContent = comic.title
        templateCard.querySelector("#id").textContent = "Id: " + comic.id
        let numPersonajes = comic.characters.returned
        if (numPersonajes == 0) {
            templateCard.querySelector("#personajes").style.display = "none"
        }
        let listaLiComics = templateCard.querySelectorAll("#personajes> li")
        listaLiComics.forEach(li => {
            li.style.display = "block"
        }) 
        for (let i = 0; i < listaLiComics.length; i++) {
            if (numPersonajes > i) {
                listaLiComics[i].textContent = "- " + comic.characters.items[i].name
                listaLiComics[i].dataset.url = comic.characters.items[i].resourceURI
                // listaLiComics[i].parentNode.href = listaLiComics[i].dataset.url + "?ts=" + ts + "&apikey=" + apikey + "&hash=" + hash
            } else {
                listaLiComics[i].style.display = "none"
            }

        }

        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);

    })
    divResultados.appendChild(fragment)
}
function crearBtn(results, title) {
    let numeropaginas = Math.ceil(results.data.total / 20)
    tipoBusqueda = searchSelected.options[searchSelected.selectedIndex].value
    switch (tipoBusqueda) {
        case "personajes":
            printCharacters(results, title)
            break;
        case "comics":
            printComics(results)
            break;
        default:
            break;
    }
    btnN = numeropaginas > pagina ? `<button id="prev" class="col-4 btn btn-dark next btn-sm-height rounded ">Siguiente</button>` : ''
    btnP = pagina > 1 ? `<button id="next" class="col-4 btn btn-dark prev btn-sm-height rounded">Anterior</button>` : ''
    inputPage.value = pagina
    labelPage.innerHTML = `de ${numeropaginas}`
    btnLeft.innerHTML = btnP
    btnRight.innerHTML = btnN

}
function limpiarPersonajes() {
    divResultados.textContent = ""
}
//Intento de pagiancion filtrado por comics
// function crearBtnComics(results, title, numeroPaginas) {
//     let numeropaginas = Math.ceil(results.data.total / 20)

//     printCharacters(results, title)
//     btnN = numeroPaginas > pagina ? `<button id="prev" class="col-4 btn btn-primary next btn-sm-height">Siguiente</button>` : ''
//     btnP = pagina > 1 ? `<button id="next" class="col-4 btn btn-primary prev btn-sm-height">Anterior</button>` : ''
//     inputPage.value = pagina
//     labelPage.innerHTML = `de ${numeroPaginas}`
//     btnLeft.innerHTML = btnP
//     btnRight.innerHTML = btnN

// }
//Pedida de datos que vamos a usar siempre
function normalCallCharacters() {
    const name = inputSearch.value.trim();
    if (name == "") {
        getAllCharacters()
            .then(results => {
                limpiarPersonajes()
                crearBtn(results)
                console.log(results)

            });
    } else {
        getCharactersByNameStartsWith(name)
            .then(results => {
                limpiarPersonajes()
                console.log(results)
                crearBtn(results)

            });
    }
}
function callCharactersByComics() {
    const title = inputSearch.value.trim();
    if (title == "") {
        getAllCharacters()
            .then(results => {

                limpiarPersonajes()
                crearBtn(results)
                console.log(results)

            });
    } else {
        getCharactersByComicsNameStartsWith(title)
            .then(results => {
                console.log(results)
                limpiarPersonajes()
                selectCharactersFromComics(results)
            });
    }
}
function callCharactersByEvents() {
    const eventName = inputSearch.value.trim();
    if (eventName == "") {
        getAllCharacters()
            .then(results => {
                limpiarPersonajes()
                crearBtn(results)
                console.log(results)

            });
    } else {
        getCharactersByEventsNameStartsWith(eventName)
            .then(results => {
                limpiarPersonajes()
                selectCharactersFromEvents(results)
                console.log(results)

            });
    }
}
function normalCallComics() {
    const title = inputSearch.value.trim();
    if (title == "") {
        getAllComics()
            .then(results => {
                limpiarPersonajes()
                crearBtn(results)
                console.log(results)

            });
    } else {
        getComicsTitleStartWith(title)
            .then(results => {
                limpiarPersonajes()
                crearBtn(results)
                console.log(results)

            });
    }
}

function idCallComics(id) {
    getComicById(id)
        .then(results => {
            limpiarPersonajes()
            crearBtn(results)
            console.log(results)

        });
}
function idCallCharacters(id) {
    getCharacterById(id)
        .then(results => {
            limpiarPersonajes()
            crearBtn(results)
            console.log(results)

        });
}


