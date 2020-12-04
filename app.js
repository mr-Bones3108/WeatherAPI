const { response } = require('express');
const express = require('express');
const https= require('https');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
   res.sendFile(__dirname + '/index.html');
   })

app.post('/', function (req, res) {
 
       const query = req.body.CityName;
       const apiKey = "ea9e00108abe56e6692c79e98ce28a45";
       const unit = "metric";
       const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit;

        https.get(url, response =>{
        console.log(response.statusCode);

         response.on('data', data =>{
            const WeatherData = JSON.parse(data)
            const temp = WeatherData.main.temp;
            const description = WeatherData.weather[0].description;
            const icon = WeatherData.weather[0].icon;
            const imageUrl ="http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + description + "<p>");
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celsius</h1>")
            res.write("<img src=" + imageUrl + ">") 
          
        })
        })
        
    })





app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})