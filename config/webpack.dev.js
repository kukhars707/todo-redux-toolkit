const {merge} = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-cheap-module-source-map',
    devServer: {
        port: 3000,
        compress: true,
        hot: true,
        historyApiFallback: true,
    }
});