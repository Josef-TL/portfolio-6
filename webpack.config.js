const path = require('path');

module.exports = {
    entry: './src/new-user.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'Client'),
    },
};