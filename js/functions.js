// fetch trending 
function getTrending() {
    fetch(`${protocol}${url}trending?api_key=${key}&limit=${limit}`)
        .then(response => response.json())
        .then(gifs => displayAllGifs(gifs))
        .catch(error => displayErrorMessage());
}

// fetch gifs for search value
function getGifs(queryTerm) {
    fetch(`${protocol}${url}search?q=${queryTerm}&limit=${limit}&api_key=${key}`)
        .then(clearGifs())
        .then(res => res.json())
        .then(gifs => displayAllGifs(gifs))
        .catch(error => displayErrorMessage());
}

// generate an img element for a gif and append to DOM
function displayGif({ images }) {
    const gifs = document.getElementById('gifs');
    const gif = images.fixed_width;
    const img = document.createElement('img');
    img.style.width = gif.width;
    img.style.height = gif.height;
    img.src = gif.url;
    gifs.appendChild(img);
}

// iterate over gif objects and display each
function displayAllGifs({ data }) {    
    for (let gif of data) {
        displayGif(gif);
    }
}

// clear the display area
function clearGifs() {
    document.getElementById('gifs').innerHTML = "";
}

// toggle UI theme
function toggleTheme() {
    let theme = 'dark';
    const dark = 'https://img.icons8.com/ios-glyphs/24/000000/moon-symbol.png';
    const light = 'https://img.icons8.com/android/24/000000/sun.png';
    return function() {
        const img = document.getElementById('toggleTheme'); 
        const error = document.querySelector('#error h4');
        document.body.style.height = 'auto';   
        if (theme == 'dark') {
            img.src = dark;
            theme = 'light';
            document
                .body.style.backgroundColor = 'white';
            error.className = 'text-dark text-center';
        } else {
            img.src = light;
            theme = 'dark';
            document
                .body.style.backgroundColor = '#191919';
            error.className = 'text-light text-center';
        }
    }
}

// toggle height of body
function toggleBodyHeight() {
    if (document.body.style.height == 'auto') {
        document.body.style.height = '100%';
    }
}

// error message for failed fetch 
function displayErrorMessage() {
    const theme = document.body.style.backgroundColor;
    let className;
    theme == 'white' ? className = 'text-dark text-center' : className = 'text-light text-center';
    document.getElementById('error')
        .innerHTML = `<h4 class="${className}">Something went wrong. Check your internet connection and try again.</h4>`;
}