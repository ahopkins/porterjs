var webpack = require("webpack");

module.exports = {
    entry: [__dirname + '/node_modules/babel-polyfill', __dirname + '/src/main.js'],
    output: {
        library: 'Porter',
        path: __dirname + '/bin',
        publicPath: "/assets/",
        filename: 'porter.min.js'
    },
    devServer: { 
        port: 8181,
        hot: true,
        contentBase: __dirname,
        inline: true
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: __dirname + '/node_modules/babel-loader'
        }]
    },
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({
        //     minimize: false,
        //     drop_console: true,
        //     mangle: {
        //         except: ['$','require','exports'],
        //         toplevel: true
        //     },
        //     compress: {
        //         sequences: true,
        //         dead_code: true,
        //         conditionals: true,
        //         booleans: true,
        //         unused: true,
        //         if_return: true,
        //         join_vars: true,
        //         drop_console: true
        //     }
        // })
    ]
};
