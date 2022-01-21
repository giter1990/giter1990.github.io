module.exports = {
	mode: "production",
	output: {
		filename: "script.js"
	},
	module: {
		rules: [
			{
				test: /\.m?js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: "babel-loader",
					options: {
						presets: [["@babel/preset-env", {
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