const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const api = require(__dirname + "/api.js")
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("Images"))
app.set("view engine","ejs")


var cityName 
var city
var country
var lastUpdated
var temp
var condition
var humidity
var clouds
var windSpeed
var feelsLike
var icon

app.post("/report",function(req,res){
    cityName = req.body.cityName
    var url = api.url(cityName);
    https.get(url,function(response){
        response.on("data",function(data){
            var weatherData = JSON.parse(data)
            city = weatherData.location.name
            country = weatherData.location.country
            lastUpdated = weatherData.current.last_updated
            temp = weatherData.current.temp_c
            condition = weatherData.current.condition.text
            humidity = weatherData.current.humidity
            clouds = weatherData.current.cloud
            windSpeed = weatherData.current.wind_kph
            feelsLike = weatherData.current.feelslike_c
            icon = weatherData.current.condition.icon

            res.render("report", {city: city , country: country, temp: temp, condition: condition, lastUpdate: lastUpdated, 
            humidity: humidity, clouds: clouds, windSpeed: windSpeed, feelsLike: feelsLike, img: icon,})
        })
    })
})


app.get("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.get("/report",function(req,res){
    res.sendFile(__dirname + "/report.html")
})

app.post("/",function(req,res){
    res.sendFile(__dirname + "/index.html")
})

app.listen(process.env.PORT  || 3000,function(req,res){
    console.log("Server started sucessfully at port 3000")
})