// API DATA WE NEED
var APIKEY = "?key=890ddaf7eee84e68a69a5bd9b1fed21b";
var URL_API = "https://api.rawg.io/api/games" + APIKEY;
var SEARCH_URL = "https://api.rawg.io/api/games?key=890ddaf7eee84e68a69a5bd9b1fed21b&search=";

// get game list
getGames(URL_API);
var data;

// info for all games we have
var info;

const form = document.getElementById("form");
const search = document.getElementById("search");

function getGames(url) {
    row.innerHTML = '';
    // fetching data from first URL
    fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        var centered_header = '';
        centered_header += '<h1 class="header">Welcome to game library</h1>';
        centered_header += '<h3 class="header" id="results">Number of total results: ' + data.count + '</h3>';
        document.getElementById("centered_header").innerHTML = centered_header;
        // creating an array
        var key = [];
        // creating an key_id wich will take key value from array
        var key_id;
        // loop whole array and pushing all the data witch id value into key[] array
        for (var i = 0; i < data.results.length; i++) {
            key.push(data.results[i].id);
        }
        // creating game_list, which will get all the information about games with particular ID in the future
        // var gameList = [];
        // looping through all key's and giving data to key_id
        const row = document.getElementById("row");
        for (var i = 0; i < key.length; i++){
            key_id = key[i];
            // creating INFO_URL with unique key_id
            var INFO_URL = "https://api.rawg.io/api/games/" + key_id + "?key=890ddaf7eee84e68a69a5bd9b1fed21b";
            // fetching every unique url
            fetch(INFO_URL).then(res => res.json()).then(info => {
                
            //    game_list.push(info);
            //    console.log(game_list);
            //    showGames(info.results);

            // pushing whole information into game_list array
            // gameList.push(info);
            console.log(info);
            var colEl = document.createElement("div");
            colEl.classList.add("col");
            colEl.innerHTML = `
            <div class="game" id="game">
            <div class="card">
            <a href="${info.website}" target="_blank">
                 <img class="card-img"
                     src="${info.background_image}"
                     alt="${info.name}">
            </a>
                 <div class="card-body">
                     <div class="game-info">
                         <h3 class="game-title">${info.name}</h3>
                         <span class="${getColor(info.rating)}">${info.rating}</span>
                         <span class="release-date">Released: ${info.released}</span>
                         
                     </div>

                     <span class="overview">
                         <p class="card-text">
                            
                            Overview: ${info.description_raw}

                         </p>
                     </span>
                 </div>
             </div>
         </div>`
        row.appendChild(colEl);
            });
        }    
        //getList(game_list);
        // showGames(data.results);
        // getId(data.results);
    });
    
}

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

function getColor(vote) {
    if (vote >= 4) {
        return 'green'
    } else if (vote >= 3) {
        return 'orange'
    } else {
        return 'red'
    }
}

// api for more data, require game id
//https://api.rawg.io/api/games/3498?key=890ddaf7eee84e68a69a5bd9b1fed21b

//https://api.rawg.io/api/games?key=890ddaf7eee84e68a69a5bd9b1fed21b&search=wither


