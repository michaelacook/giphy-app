// fetch trending gifs
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
    const div = document.createElement('div');
    const btn = document.createElement('button');
    const overLay = document.createElement('div');
    overLay.className = 'overlay';
    div.className = 'gif-container';
    btn.className = 'btn btn-sm btn-primary shareBtn';
    btn.setAttribute('data-toggle', 'modal');
    btn.setAttribute('data-target', '#shareModal');
    btn.textContent = 'Share';
    img.src = gif.url;
    div.appendChild(img);
    div.appendChild(overLay);
    div.appendChild(btn);
    gifs.appendChild(div);
}

// iterate over gif objects and display each
function displayAllGifs({ data }) {    
    for (let gif of data) {
        displayGif(gif);
    }
}

// gets and adds share link to share modal
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

// copy gif url
function copyLink() {
    document.getElementById('shareLink').select();
    document.execCommand("copy");
    showLinkCopiedMsg();
}

// show message when link is copied in share modal
function showLinkCopiedMsg() {
    document.querySelector('.modal .text-danger').textContent = 'copied!';
}

// clear link copied message when modal is closed
function clearLinkCopiedMsg() {
    document.querySelector('.modal .text-danger').textContent = '';
}

// clear the display area
function clearGifs() {
    document.getElementById('gifs').innerHTML = '';
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

