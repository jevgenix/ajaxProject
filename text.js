var APIKEY = "?key=890ddaf7eee84e68a69a5bd9b1fed21b";
var GAME_DATA = "https://api.rawg.io/api/games" + APIKEY;
var key;

getGames(GAME_DATA);

var btn = document.getElementById("btn");
btn.addEventListener("click", getGames);

function getGames(url) {
    
        fetch(url).then(res => res.json()).then(data => {
            console.log(data);
        });
    
}