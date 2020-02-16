// fetch trending 
function getTrending() {
    fetch(`${protocol}${url}trending?api_key=${key}&limit=${limit}`)
        .then(response => response.json())
        .then(gifs => displayAllGifs(gifs))
        // .finally(applyImgBorder());
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