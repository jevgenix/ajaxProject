// first demo code goes here

var APIKEY = "?key=890ddaf7eee84e68a69a5bd9b1fed21b";
var URL = "https://api.rawg.io/api/platforms";
var URL_API = "https://api.rawg.io/api/games" + APIKEY;
var BIG_DATA = "https://api.rawg.io/api/platforms" + APIKEY;
var SEARCH_URL = "https://api.rawg.io/api/games?key=890ddaf7eee84e68a69a5bd9b1fed21b&search=";


const row = document.getElementById("row");
const form = document.getElementById("form");
const search = document.getElementById("search");

getGames(URL_API);
var data;

function getGames(url) {
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);

        showGames(data.results);

        var centered_header = '';
        centered_header += '<h1 class="header">Welcome to game library</h1>';
        centered_header += '<h3 class="header" id="results">Number of total results: ' + data.count + '</h3>';
        document.getElementById("centered_header").innerHTML = centered_header;
    });
}

//Genres: ${data.results.genres.name + ". "} <br>
function showGames(data) {
    row.innerHTML = '';
    data.forEach(game => {
        const { background_image, rating, playtime, released, name, ratings_count, id, description } = game;
        var GAME_DATA = "https://api.rawg.io/api/games/" + id + APIKEY;


        var colEl = document.createElement('div');
        colEl.classList.add('col');
        colEl.innerHTML = ` 
                 <div class="game" id="game">
                     <div class="card">
                         <img class="card-img"
                             src="${background_image}"
                             alt="${name}">

                         <div class="card-body">
                             <div class="game-info">
                                 <h3 class="game-title">${name}</h3>
                                 <span class="${getColor(rating)}">${rating}</span>
                             </div>

                             <span class="overview">
                                 <p class="card-text">
                                    Game id: ${id} <br>
                                    Overview: ${description} <br>
                                     Released: ${released} <br>
                                     Review count: ${ratings_count}. <br>
                                     Average playtime: ${playtime}h. <br>
                                     Our comments: ${getAnswer(rating)} 
                                     
                                 </p>
                             </span>
                         </div>
                     </div>
                 </div>`

        
        row.appendChild(colEl);
    });
}


function getColor(vote) {
    if (vote >= 4) {
        return 'green'
    } else if (vote >= 3) {
        return 'orange'
    } else {
        return 'red'
    }
}
function getAnswer(rating) {
    if (rating == 5) {
        return 'This game is exceptional.'
    } else if (rating >= 4) {
        return 'This game is recommended.'
    } else if (rating >= 3) {
        return 'Only few people will enjoy this game.'
    } else {
        return 'Our recommendation is to skip this game.'
    }
}

// api for more data, require game id
//https://api.rawg.io/api/games/3498?key=890ddaf7eee84e68a69a5bd9b1fed21b

//https://api.rawg.io/api/games?key=890ddaf7eee84e68a69a5bd9b1fed21b&search=wither

form.addEventListener("submit", (event) => {
    event.preventDefault();
    const searchValue = search.value;
    if (searchValue) {
        getGames(SEARCH_URL + searchValue);
        console.log(search.value);
        console.log(SEARCH_URL + searchValue);

    } else {
        getGames(URL_API);
    }
});
