import webpack from 'webpack'

export default {
	debug: true,
	devtool: 'source-map',
	noInfo: false,
	entry: {
		'app': [
			'./src/index'
		]
	},
	output: {
		path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.optimize.DedupePlugin()
	],
	module: {
		loaders: [
			{test: /\.(js|jsx)$/, exclude: /node_modules/, loaders: ['babel']},
			{test: /\.json$/, loaders: ['json']},
			{test: /\.css$/, loaders: ['style', 'css']},
			{test: /\.scss$/, loaders: ['style', 'css', 'resolve-url', 'sass?sourceMap']},
			{test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file"},
			{test: /\.(woff|woff2)$/, loader: "url?prefix=font/&limit=5000"},
			{test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream"}
		]
	}
}