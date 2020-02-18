/* Settings for making fetch requests */

let protocol;
window.location.protocol === 'https:' ? protocol = 'https://'
    : protocol = 'http://';
const url = 'api.giphy.com/v1/gifs/';
const key = 'J9blSZYBWbVud1NNpb80lb69IuhKeMmv';
let limit = 35;
let offset = 0;

