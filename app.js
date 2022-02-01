// API DATA
var APIKEY = "?key=b3f2c4352fa4454eaaefacdc5a653338";
var URL_API = "https://api.rawg.io/api/games" + APIKEY;
var SEARCH_URL = "https://api.rawg.io/api/games?key=b3f2c4352fa4454eaaefacdc5a653338&search=";
var PAGE_URL = URL_API + "&page=";

// KUTSUTAAN FUNKTIO, LIITETÄÄN FUNKTIOON URL_API
// BY DEFAULT SE FUNKTIO AINA KUTSUU URL_API
getGames(URL_API);

// KÄYTÄMME KAHTA ERI API, JOTEN JOUDUMME LÄHETTÄÄ FETCHATUN DATAN KAHTEEN ERI MUUTTUJAAN
// SUURI DATA
var data;

// TIETYN PELIN DATA, ID:N AVULLA
var info;

// MUUTTUJAT HAKUA VARTEN
const form = document.getElementById("form");
const search = document.getElementById("search");

// UNIIKKI KOODI POPUPPIA VARTEN
var uQode = 0;

//PAGINATOR MUUTTUJAT
const prev = document.getElementById("prev");
const current = document.getElementById("current");
const next = document.getElementById("next");
const nothing = document.getElementById("nothing");
var currentPage = 1;
var totalPages;

function getGames(url) {
    // TYHJENNETÄÄN HTML ELEMENTTI
    const row = document.getElementById("row");
    row.innerHTML = '';
    // FETCH DATA ENSIMMÄISEEN MUUTTUJAAN
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        // LET'S DO SOME MATH :D

        // 20 KORTTIA/SIVU
        var i = 20;
        // MONTAKO KORTTIA ON YHTEENSÄ
        var t = data.count;
        // HAETAAN JAKOJÄÄNNÖS
        var m = t % i;
        // JOS JAKOJÄÄNNÖS 0, NIIN SIVUJA ON t / i
        if (t % i == 0) {
            totalPages = t / i
        }
        // MUULLOIN T (total) - M (modulo), jaetaan erotus i:lla (kortteilla/sivu) ja lisätään 1 (sivu moduloa varten)
        else {
            totalPages = (t - m) / i + 1;
        }
        // LISÄTÄÄN LOGIIKKA PAGINATORILLE JA SIVULLE
        if (t < 20) {
            next.classList.add("disabled");
            prev.classList.add("disabled");
        } if (data.next == null) {
            next.classList.add("disabled");
        } else if (data.previous == null) {
            prev.classList.add("disabled");
        }
        else {
            next.classList.remove("disabled");
            prev.classList.remove("disabled");
        }
        if (t == 0) {
            current.classList.add("disabled");
            nothing.innerHTML = "<h1>No pages found</h1>";
        } else {
            current.classList.remove("disabled");
            nothing.innerHTML = "";
        }
        // VARMISTUS
        if (data.next !== null) {
            next.classList.remove("disabled");
        }
        if ( t > 20) {
            current.innerText = "";
            current.innerText = currentPage + "/" + totalPages;
        } else {
            current.innerText = "";
            current.innerText = currentPage;
        }
        
        // LISÄTÄÄN TOTAL RESULTS ALKUUN
        var centered_header = '';
        centered_header += '<h1 class="header">Welcome to game library</h1>';
        centered_header += '<h3 class="header" id="results">Number of total results: ' + data.count + '</h3>';
        document.getElementById("centered_header").innerHTML = centered_header;

        // LUODAAN AVAIN LISTAN
        var key = [];
        // LUODAAN KEY_ID, JOKA SAA ITSELLEEN TULEVAISUUDESSA ARVON key[] LISTASTA
        var key_id;

        // HAETAAN ID LISTA APISTA JA PUSHATAAN LISTAN TIEDOT key[] LISTAAN
        for (var i = 0; i < data.results.length; i++) {
            key.push(data.results[i].id);
        }

        // LOOPATAAN AVAIMET JA ANNETAAN key_id AVAIMEN ARVOKSI
        for (var i = 0; i < key.length; i++) {
            key_id = key[i];
        
        // LUODAAN INFO_URL JOLLA ON UNIIKKI key_id
            var INFO_URL = "https://api.rawg.io/api/games/" + key_id + "?key=b3f2c4352fa4454eaaefacdc5a653338";
        // FETCH EVERY URL WITH UNIQUE ID
            fetch(INFO_URL).then(res => res.json()).then(info => {
            // TÄMÄN TAKIA BOOTSTRAP!
            var colEl = document.createElement("div");
            colEl.classList.add("col");
            colEl.classList.add("d-flex");
            colEl.classList.add("justify-content-evenly");
            colEl.innerHTML = `
            <div class="game" id="game">
            <div class="card">
            <div class="modal fade" id="modal${+ uQode}" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">${info.name}</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                Overview: <br>
                ${info.description_raw}
                <br>
                Release-date: ${info.released}
                </div>
                <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button> 
                </div>
            </div>
            </div>
        </div>
                <img class="card-img"
                    src="${info.background_image}"
                    alt="${info.name}"
                    data-bs-toggle="modal" data-bs-target="#modal${+ uQode++}">
            
                <div class="card-body">
                    <div class="game-info">
                        <h3 class="game-title">${info.name}</h3>
                        <span class="${getColor(info.rating)}">${info.rating}</span>                                                  
                    </div>
                </div>
            </div>
        </div>`
                row.appendChild(colEl);
            });
        }
    });
}
// VÄRI RIIPPUU RATINGISTA :)
function getColor(vote) {
    if (vote >= 4) {
        return 'green'
    } else if (vote >= 3) {
        return 'orange'
    } else {
        return 'red'
    }
}

// EVENT LISTENERIT

// LUODAAN TYHJÄN HAKUKENNÄN
var searchValue = '';
form.addEventListener("submit", (event) => {
    // KOSKA SUBMIT
    event.preventDefault();
    searchValue = search.value;
    if (searchValue) {
        getGames(SEARCH_URL + searchValue);
        currentPage = 1;
        console.log(search.value);
        console.log(SEARCH_URL + searchValue);
    } else {
        currentPage = 1;
        getGames(URL_API);
    }
});

if (currentPage == 1) {
    prev.classList.add("disabled");
}

// JOTTA PAGINATOR TOIMISI HAKUKENNÄN KANSSA
next.addEventListener("click", (event) => {
    currentPage++;
    getGames(PAGE_URL + currentPage + "&search=" + searchValue);
    prev.classList.remove("disabled");
});

prev.addEventListener("click", (event) => {
    if (currentPage > 1) {
        currentPage--;
        getGames(PAGE_URL + currentPage + "&search=" + searchValue);
    } 
    if(currentPage == 1){
        prev.classList.add("disabled");
    } 
});

// TÄSSÄ LEIKIN API:N KANSSA
// https://api.rawg.io/api/games/3498?key=890ddaf7eee84e68a69a5bd9b1fed21b
// https://api.rawg.io/api/games?key=890ddaf7eee84e68a69a5bd9b1fed21b&search=wither
// https://api.rawg.io/api/games?key=890ddaf7eee84e68a69a5bd9b1fed21b&page=2&search=witcher