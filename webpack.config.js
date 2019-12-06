const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const ProgressPlugin = require('progress-webpack-plugin')
const prod = process.env.NODE_ENV === "production"
let plugins = [
    new HtmlWebpackPlugin({
        template: 'src/index.html'
    }),
    new ProgressPlugin()
]
if (prod)
    plugins.push(new MinifyPlugin({}, { comments: false }))
module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: prod ? "production" : "development",
    plugins: plugins,
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    }
}