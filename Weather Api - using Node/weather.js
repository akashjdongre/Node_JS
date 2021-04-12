
    const axios = require('axios');
    const http = require('http');
    const fs = require('fs');
    const mustache   = require('mustache');

    const server = http.createServer((req,resp) => 
    {
        //const ENTIRE_API_URL = `http://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=6af5c551a780f8227dd6111406d507bf`;
        const ENTIRE_API_URL = `http://api.openweathermap.org/data/2.5/weather?q=Bhandara&appid=6af5c551a780f8227dd6111406d507bf`;
        
        axios.get(ENTIRE_API_URL)
        .then(response =>   // handle success
        {     
            console.log(response.data)
            const kelvin_temp = response.data.main.temp;
            //const fahrenheit_temp = (kelvin_temp * 9/5) - 459.67;
            const location = response.data.name;        
            const celcius_temp = parseInt(kelvin_temp - 273.15);        
            const min_celcius_temp = parseInt(response.data.main.temp_min - 273.15);        
            const max_celcius_temp = parseInt(response.data.main.temp_max - 273.15);        
            const png_icon = response.data.weather[0].icon;        
            
            resp.writeHead(200 , {"Content-type" : "text/html"}) ;
            var content = fs.readFileSync("./weather.html","utf-8");
            //const weatherFile = fs.createReadStream('./weather.html' , 'UTF-8');
        
            var view = { location:location, tempval:celcius_temp , pngIcon:png_icon , minTemp : min_celcius_temp, maxTemp : max_celcius_temp} // replacing placeholder in html file
            var output = mustache.render(content, view);
            resp.write(output);
            resp.end();
        })    
        .catch(error => console.log('Error', error));    // handle error
    }).listen(3000,'localhost');