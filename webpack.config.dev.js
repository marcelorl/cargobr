import merge from 'webpack-merge'
import config from './webpack.config'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import express from 'express'
import webpack from 'webpack'
import path from 'path'
import open from 'open'

const port = 1337
const app = express()

let dev = {
	entry: {
		'app': [
			'webpack-hot-middleware/client?reload=true'
		]
	},
	devServer: {
		contentBase: './src'
	},
	module: {
		loaders: [
			{test: /\.(jpe?g|png|gif|svg)$/i, loaders:
				[
					'file?hash=sha512&digest=hex&name=[hash].[ext]',
					'image-webpack?{progressive:true, optimizationLevel: 7, interlaced: false, pngquant:{quality: "65-90", speed: 4}}'
				]
			}
		]
	},
	plugins: [
        new webpack.HotModuleReplacementPlugin()
    ]
}

const compiler = webpack(merge.smart(config, dev))
const middleware = webpackMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath,
    quiet: false,
    lazy: false,
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },
    stats: {
        colors: true
    }
})

app.use(express.static('dist'))

app.use(middleware)
app.use(webpackHotMiddleware(compiler))

app.get('*', function(req, res) {
	res.sendFile(path.join( __dirname, './index.html'))
})

app.listen(port, '0.0.0.0', function onStart(err) {
	if (err) {
		console.log(err)
	} else {
		open(`http://0.0.0.0:${port}`)
	}
})