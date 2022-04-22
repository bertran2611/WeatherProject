const express = require('express')
const { json } = require('express/lib/response')
const app = express()
const port = 3000
const https = require('https')
const { send } = require('process')
const bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.post('/', (req, res) => {

    const query = req.body.cityName
//     insert API key down below
    const apiKey = ''
    const unit = 'metric'
    
    const urlWeather = 'https://api.openweathermap.org/data/2.5/weather?q='+ query +'&units='+unit+'&appid=' + apiKey;

    https.get(urlWeather, (response) =>{
        console.log(response.statusCode)

        response.on('data', (data) =>{
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp
            const weatherDesc = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = "https://openweathermap.org/img/wn/"+ icon +"@2x.png"

            res.write('<head><meta charset"utf-8"></head>')
            res.write("<h3>The weather is currently " + weatherDesc + "</h3>");
            res.write("<h1>The temperature in "+query+" is " + temp + " degrees Celcius. </h1>");
            res.write("<img src='"+imageURL+"'>");
            res.send()
        })
    }) 
})



app.listen(port, () =>{
    console.log(`Example app listening on port ${port}!`)
})

