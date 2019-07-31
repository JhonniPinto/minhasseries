const express    = require('express')
const path       = require('path')
const bodyParser = require('body-parser')
const app        = express()
const port       = process.env.PORT || 3000
const mongo      = process.env.MONGODB ||'mongodb://localhost/minhas-series'

const pagesRouter  = require('./routes/pages')
const seriesRouter = require('./routes/series')

const mongoose   = require('mongoose')
mongoose.Promise = global.Promise

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', pagesRouter)
app.use('/series', seriesRouter)

mongoose
    .connect(mongo, { useNewUrlParser: true })
    .then(() => {
        app.listen(port, err => {
            console.log(`Minhas séries is CONNECTED on port: ${port}`)
        })
    })
    .catch(err => console.log('ERRO:', err))