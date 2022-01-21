module.exports = {
	mode: "development",
	output: {
		filename: "script.js"
	},
	watch: false,
	devtool: "source-map",
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [["@babel/preset-env", {
							debug: true,
							corejs: 3,
							useBuiltIns: "usage",
							targets: "> 0.25%, not dead"
						}]]
					}
				}
			}
		]
	}
}