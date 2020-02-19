// prevent page reload on submit
document.addEventListener('submit', e => e.preventDefault());

// display tending on page load
getTrending();

const searchBar = document.getElementById('searchBar');
const searchBtn = document.getElementById('searchBtn');
const toggleThemeButton = document.getElementById('toggleTheme');

// closure for toggling light and dark themes
const toggleUITheme = toggleTheme();
toggleThemeButton.addEventListener('click', e => {
    toggleUITheme();
});

let queryTerm;

// search for and display gifs
searchBtn.addEventListener('click', e => {
    toggleBodyHeight()
    searchBar.blur();
    searchBtn.blur();
    queryTerm = searchBar.value;
    getGifs(queryTerm);
    searchBar.value = "";
});

document.getElementById('gifs').addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        addShareLinks(e);
    }
});





