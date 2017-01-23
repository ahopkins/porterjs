var webpack = require("webpack");

module.exports = {
    entry: ['babel-polyfill', './src/main.js'],
    output: {
        library: 'Porter',
        path: './bin',
        publicPath: "/assets/",
        filename: 'porter.min.js'
    },
    devServer: { inline: true },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            minimize: false,
            drop_console: true,
            mangle: {
                except: ['$','require','exports'],
                toplevel: true
            },
            compress: {
                sequences: true,
                dead_code: true,
                conditionals: true,
                booleans: true,
                unused: true,
                if_return: true,
                join_vars: true,
                drop_console: true
            }
        })
    ]
};
