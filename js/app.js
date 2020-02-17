// display tending on page load
getTrending();

const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');

let queryTerm;

// search for and display gifs
searchBtn.addEventListener('click', e => {
    searchBar.blur();
    searchBtn.blur();
    queryTerm = searchBar.value;
    fetch(`${protocol}${url}search?q=${queryTerm}&limit=${limit}&api_key=${key}`)
        .then(clearGifs())
        .then(res => res.json())
        .then(gifs => displayAllGifs(gifs));
    searchBar.value = "";
});

