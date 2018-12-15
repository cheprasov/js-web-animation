const path = require('path');

module.exports = {
    entry: {
        'web-animation.js': './src/WebAnimation.js',
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name]',
    },
    resolve: {
        alias: {
            "/SRC": path.resolve(__dirname, "src/"),
        }
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                    },
                ],
            },
        ]
    },
    optimization: {
    }
};

