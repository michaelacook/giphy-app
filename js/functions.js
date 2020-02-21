/**
 * Fetch trending gifs
 * Default on page load
 */
function getTrending() {
    fetch(`${protocol}${url}trending?api_key=${key}&limit=${limit}`)
        .then(response => response.json())
        .then(gifs => displayAllGifs(gifs))
        .catch(error => displayErrorMessage());
}


/**
 * Fetch gifs for a search term
 * Calls displayAllGifs function
 * @param {String} queryTerm - used to query the GIPHY api
 */
function getGifs(queryTerm) {
    fetch(`${protocol}${url}search?q=${queryTerm}&limit=${limit}&api_key=${key}`)
        .then(clearGifs())
        .then(res => res.json())
        .then(gifs => displayAllGifs(gifs))
        .catch(error => displayErrorMessage());
}


/**
 * Generates an img element for a gif and appends to the DOM
 * Adds overlay with share button
 * @param {Object} param images - destructures the response object to extract image information
 */
function displayGif({ images }) {
    const gifs = document.getElementById('gifs');
    const gif = images.fixed_width;
    const img = document.createElement('img');
    const div = document.createElement('div');
    const btn = document.createElement('i');
    const overLay = document.createElement('div');
    overLay.className = 'overlay';
    div.className = 'gif-container';
    btn.className = 'fas fa-share-alt-square fa-2x shareBtn';
    btn.setAttribute('data-toggle', 'modal');
    btn.setAttribute('data-target', '#shareModal');
    img.src = gif.url;
    div.appendChild(img);
    div.appendChild(overLay);
    div.appendChild(btn);
    gifs.appendChild(div);
}


/**
 * Iterate over gif objects and display each 
 * @param {Object} param data - extracts array of gif images from response
 * Calls displayGif function
 */
function displayAllGifs({ data }) {    
    for (let gif of data) {
        displayGif(gif);
    }
}


/**
 * Adds links to share modal
 * @param {Object} e - DOM event object
 */
function addShareLinks(e) {
    const link = e.target.parentNode.firstElementChild.src;
    const shareLink = document.getElementById('shareLink');
    const fbShareLink = `https://www.facebook.com/sharer/sharer.php?u=${link}`;
    const twitterShareLink = `http://twitter.com/share?url=${link}`;
    const redditShareLink = `http://www.reddit.com/submit?url=${link}`;
    document.querySelector('.fa-facebook').parentNode.href=fbShareLink;
    document.querySelector('.fa-twitter').parentNode.href=twitterShareLink;
    document.querySelector('.fa-reddit').parentNode.href=redditShareLink;
    shareLink.setAttribute('placeholder', link);
    shareLink.value = link;
}


/**
 * Copy gif share link to clipboard
 * Display copied message
 */
function copyLink() {
    document.getElementById('shareLink').select();
    document.execCommand("copy");
    document.querySelector('.modal .text-danger').textContent = 'copied!';
}


/**
 * Remove copied message
 */
function clearLinkCopiedMsg() {
    document.querySelector('.modal .text-danger').textContent = '';
}


/**
 * Clear gifs on new search
 */
function clearGifs() {
    document.getElementById('gifs').innerHTML = '';
}


/**
 * Toggle UI theme between dark and light
 * Toggle change theme icons
 * Changes body height to auto to allow full height of body to change colour
 * @return closure to prevent globals
 */
function toggleTheme() {
    let theme = 'dark';
    const dark = 'https://img.icons8.com/ios-glyphs/24/000000/moon-symbol.png';
    const light = 'https://img.icons8.com/android/24/000000/sun.png';
    return () => {
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


/**
 * Toggle height of the body element 
 * Needed to change body height back to 100% after change UI theme 
 * toggleTheme call temporarily changes body height to auto to allow 
 * UI theme change to apply to full height of body
 */
function toggleBodyHeight() {
    if (document.body.style.height == 'auto') {
        document.body.style.height = '100%';
    }
}


/**
 * Display an error message to user 
 * Called when fetch to api fails
 */
function displayErrorMessage() {
    const theme = document.body.style.backgroundColor;
    let className;
    theme == 'white' ? className = 'text-dark text-center' : className = 'text-light text-center';
    document.getElementById('error')
        .innerHTML = `<h4 class="${className}">Something went wrong. Check your internet connection and try again.</h4>`;
}

