import webpack from 'webpack'

export default {
	entry: {
		'app': [
			'webpack-hot-middleware/client?reload=true'
		]
	},
	devServer: {
		contentBase: './src'
	},
	plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}