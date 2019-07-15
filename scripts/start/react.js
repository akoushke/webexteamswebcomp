const path = require('path');
const WebpackDevServer = require("webpack-dev-server")
const webpack = require("webpack")
const config = require("../webpack.config.base")

const compiler = webpack(config)


const mobileServer = new WebpackDevServer(compiler.compilers[0], {
	contentBase: path.join(__dirname, 'samples/reactJS/src'),
	hot: true,
	open: true,
	historyApiFallback: false,
	compress: true,
	clientLogLevel: 'silent',
});


mobileServer.listen(5001, 'localhost', function() {});
