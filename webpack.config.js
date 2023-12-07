const path = require('path');

module.exports = {
    entry: './src/new-user.js',
    output: {
        filename: 'login.js',
        path: path.resolve(__dirname, 'Client'),
    },
};