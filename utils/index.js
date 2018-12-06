const glob = require('glob');
const path = require('path');

glob.sync('../!(node_modules)/').map((file) => {
    console.log(file);
    console.log(file.split('/').slice(-2, -1));
});
