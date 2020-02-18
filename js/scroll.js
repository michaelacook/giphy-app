/* Handle loading and appending gifs on scroll to the bottom */

let active = false;
const scrollLimit = 10;
offset += 11;

window.addEventListener('scroll', e => {
    if ((window.innerHeight + window.scrollY) >= document.body.scrollHeight) {
        if (!active) {
            active = true;
            let requestUrl;
            queryTerm ? requestUrl = `${protocol}${url}search?q=${queryTerm}&limit=${scrollLimit}&offset=${offset}&api_key=${key}`
                : requestUrl = `${protocol}${url}trending?api_key=${key}&limit=${scrollLimit}`;
            fetch(requestUrl)
                .then(res => res.json())
                .then(gifs => displayAllGifs(gifs))
                .finally(setTimeout(() => {
                    active = false;
                }, 4000));
            offset += 11;
        }
    }
});