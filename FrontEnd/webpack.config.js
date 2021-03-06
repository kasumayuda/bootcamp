var webpack = require("webpack");

module.exports = {
    entry: './src/index.js',
    output: {
        path: 'assets',
        filename: 'bundle.js',
        publicPath: 'assets'
    },
    externals:{
        'Config' : JSON.stringify(require('./config.json'))
    },
    devServer:{
        inline: true,
        contentBase: '',
        port: 3001
    },
    module:{
        loaders:[
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: ['babel-loader'],
                query: {
                    presets: ['latest', 'react','stage-0']
                }
            },
            {
                test: /\.json$/,
                exclude: /(node_modules)/,
                loader:'json-loader'
            },
            {
                test: /\.css$/,
                loader:'style-loader!css-loader!autoprefixer-loader'
            },
            {
                test: /\.scss$/,
                loader:'style-loader!css-loader!autoprefixer-loader!sass-loader'
            }
        ]
    }
}