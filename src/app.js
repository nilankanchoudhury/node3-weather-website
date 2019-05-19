const express = require('express')
const path = require('path')
const hbs = require('hbs')

//Weather app
const geocode = require('./utils/geocode')
const forecast =require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000 

//app.com
//app.com/about
//app.com/help 

console.log(__dirname)

//Define Paths for express config
const dirPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(dirPath))

app.get('',(req,res)=>{
    res.render('index',{
        name: 'Andrew',  
        title: 'Weather App' 
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name: 'Nilankan',
        title: 'About me'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message: 'its the help page',
        name: 'Nilankan',
        title: 'Help'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }
            forecast(latitude,longitude, (error, forecast) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            res.send({
                location: location,
                forecast: forecast
            })
        })
    })
})
app.get('/product',(req,res)=>{
    if(!req.query.search){
        return res.send({
           error: 'You must provide a search term '
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})


// 404 Page request always at the bottom
app.get('/help/*',(req,res)=>{
    res.render('error',{
        value: 'Help article not found',
        name: 'Nilankan',
        title: '404 Page'
    })
})
app.get('*',(req,res)=>{
    res.render('error',{
        value:'Error 404 : Page not found !',
        name: 'Nilankan',
        title: '404 Page'
    })
})
//--------end of 404 page request ------

app.listen(port,()=>{
    console.log('Server is up and running on port :', port)
})