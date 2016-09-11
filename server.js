import merge from 'webpack-merge'
import config from './webpack.config'
import configDev from './webpack.config.dev'
import webpackMiddleware from 'webpack-dev-middleware'
import webpackHotMiddleware from 'webpack-hot-middleware'
import express from 'express'
import webpack from 'webpack'
import path from 'path'
import open from 'open'

const port = 1337
const app = express()

const compiler = webpack(merge.smart(config, configDev))
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