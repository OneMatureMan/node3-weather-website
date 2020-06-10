const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./ultils/forecast')
const geocode = require('./ultils/geocode')

const app = express();

// Define paths for Express Config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

// Setup Handlebars engine and views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup the static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req,res) => {
    res.render('index',{
        title:'Weather',
        name: 'Hussein Amr'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        title:'Help',
        name: 'Hussein Amr',
        help: 'I will help you brother'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:'About',
        name: 'Hussein Amr'
    })
})



app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:'No address has been provided!'
        })
    }
    geocode(req.query.address,(error,{latitude,longtitude,location} = {}) => {
        if(error) {
            return res.send({error})
        }
        forecast(latitude,longtitude,(error,forecastData) => {
            if(error) {
                return res.send({error})
            }

            res.send({
                address: req.query.address, 
                forecast:forecastData, 
                location
            })
        })
    })


})

app.get('/products', (req,res) => {
    if(!req.query.search){
        return res.send({
            error:'You must provide a search term'
        })
    }
    
    console.log(req.query)
    res.send({
        products:[]
    })
})

app.get('/help/*', (req,res) => {
    res.render('404',{
        title:'404',
        name: 'Hussein Badawy',
        error:'Help article Not found'
    })
})

app.get('*', (req,res) => {
    res.render('404',{
        title:'404',
        name: 'Hussein Badawy',
        error:'Page Not found'
    })
})



app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})