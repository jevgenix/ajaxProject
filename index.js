// API DATA
var APIKEY = "?api_key=5a1a3e7ee3c784c00496ff7f53ef6605c0bdc1c9";
var BASE_URL = "https://www.giantbomb.com/api";

var GAMES_URL = BASE_URL + "/games/" + APIKEY;
var SEARCH_URL = BASE_URL + "/search/" + APIKEY + "&format=json";
var GAME_RATING_URL = BASE_URL + "/game_ratings/" + APIKEY + "&format=json";

// lets filter our API
var FILTER = "&field_list=deck,image,name,original_release_date,original_game_rating,expected_release_year";

// by default its in format xml, so we need to change format into json by adding &format=json after our API KEY
var URL_API = "https://www.giantbomb.com/api/games/?api_key=5a1a3e7ee3c784c00496ff7f53ef6605c0bdc1c9&format=json";

const row = document.getElementById('row');
const form = document.getElementById("form");
const search = document.getElementById("search");
var data;

getGames(URL_API);
// getRatings(GAME_RATING_URL);

function getRatings() {
    const xhttp = new XMLHttpRequest();
    xhttp.onload = function() {

      data = JSON.parse(this.responseText);
      console.log(data);
      
    }
    xhttp.open("GET", GAME_RATING_URL, true);
    xhttp.send();
    
  }

/* 
function getGames(url) {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", URL_API, true);
    xmlhttp.send();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        data = JSON.parse(this.responseText);
        console.log(data.results[0]);
        showGames(data.results);
        }
    }
} 
*/


function getGames(url){
    fetch(url).then(res => res.json()).then(data =>{
        console.log(data);
        showGames(data.results);

        var centered_header = '';
        centered_header += '<h1 class="header">Welcome to game library</h1>';
        centered_header += '<h3 class="header" id="results">Number of total results: ' + data.number_of_total_results + '</h3>';
        document.getElementById("centered_header").innerHTML = centered_header;


    })
}


function showGames(data) {
    row.innerHTML = '';
    //var image;
    //for(i = 0; i < data)


    data.forEach(game => {
        const {deck, original_release_date, image, name, site_detail_url} = game;
        var colEl = document.createElement("div");
        colEl.classList.add('col');
        colEl.innerHTML = `
        <div class="game" id="game">
        <div class="card">
        <a href="${site_detail_url}" target="_blank">
            <img class="card-img" id="card-img"
            src="${image.original_url}"
            alt="${name}">
        </a>
                <div class="card-body">
                    <div class="game-info">
                        <h3 class="game-title">${name}</h3>
                        <span class="green">8.0</span>
                    </div>
                <span class="overview">
                    <p class="card-text">
                        Released: ${original_release_date} <br>
                        Overview: ${deck}
                        
                    </p>
                </span>
                </div>
        </div>
    </div>`
        row.appendChild(colEl);
    });
}


//    document.getElementById("card-img").addEventListener('click', (event) => {
        
//    }); 


//         <h1 class="header">Welcome to game library</h1>
//         <h3 class="header" id="results">Number of total results: </h3>
    

    



form.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchValue = search.value;
    if(searchValue) {
        getGames(SEARCH_URL+'&query='+searchValue);
        console.log(search.value);
        console.log(SEARCH_URL+'&query='+searchValue);
    } else {
        getGames(URL_API);
    }
});

