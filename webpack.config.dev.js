import webpack from 'webpack'

export default {
	entry: {
		'app': [
			'webpack-hot-middleware/client?reload=true'
		]
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/dist'
	},
	devServer: {
		contentBase: './src'
	},
	plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}