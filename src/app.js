const path = require('path')
const express = require('express');
const hbs = require('hbs')
const request = require('request')
const geoCode = require('./utils/geoCode')
const forecast = require('./utils/forecast')

const app = express()
//To replace views directory name to templates.
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')
// console.log(viewsPath);

//setting up handlebars.
app.set('view engine','hbs')
//In case if the path of the views and templates are same then can use the following code.
// app.set('views','templates') 
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)
//setup static directory to serve.
const staticFilePath =  path.join(__dirname,'../public')
// console.log(staticFilePath);
app.use(express.static(staticFilePath))
app.get('', (req,res) => {
    res.render('index',{
        title: 'Weather App',
        name: 'Sheikh Faiz Meraj',
        year: '2021'
    })
})

app.get('/help', (req,res) => {
    res.render('help',{
        contact  : '+91-9876543210',
        title: 'Help',
        name: 'Faiz',
        year: '2021'
    })
})
app.get('/about', (req,res) => {
    res.render('about',{
        title: 'About Page',
        name: 'Sheikh Faiz Meraj',
        year: '2021'
    })
})


app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'Please provide a location to know weather condition !'
        })
    }
        // console.log(req.query.search);
    geoCode(req.query.address, (error, {longitude,lattitude,place_name} = {})=>{
    if(error)   {
        return res.send({
            error
        })
    }
    forecast(lattitude,longitude,(error,response) => {
        if(error)   {
        return res.send({
            error
        })
        }
        res.send({
           response,
           place_name
        })

        })
    })
    
    
})

app.get('/help/*', (req,res) =>{
    res.render('error',{
        error: 'Help Article Not found !!',
        title: 'Error',
        name: 'Faiz'
    })
})
app.get('*',(req,res) =>{
    res.render('error',{
        error: 'Error 404: Page Not Found !!',
        title: 'Error',
        name: 'Faiz'
    })
})

const PORT = process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})