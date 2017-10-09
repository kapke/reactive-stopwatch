const path = require('path');

const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    entry: {
        app: './app/app.js',
    },
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.js', '.jsx'],
    },
    module: {
        rules: [
            {test: /\.jsx?/, use: 'babel-loader', exclude: /node_modules/},
        ],
    },
    plugins: [
        new CopyWebpackPlugin([
            {from: './app/index.html', to: 'index.html'},
            {from: './app/style.css', to: 'style.css'},
        ]),
    ],
};
