const Webpack = require("webpack")
const config = require("../webpack.config.base")

Webpack(config).compilers[2].run();