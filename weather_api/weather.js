
const axios = require('axios');
const http = require('http');
const fs = require('fs');
const mustache   = require('mustache');


    const server = http.createServer((req,resp) => 
    {
        const ENTIRE_API_URL = `http://api.openweathermap.org/data/2.5/weather?q=Mumbai&appid=6af5c551a780f8227dd6111406d507bf`;
        //const ENTIRE_API_URL = `http://api.openweathermap.org/data/2.5/weather?q=Nagpur&appid=6af5c551a780f8227dd6111406d507bf`;
        
        axios.get(ENTIRE_API_URL)
        .then(response =>   // handle success
        {     
            //console.log(response.data)
            const kelvin_temp = response.data.main.temp;
            //const fahrenheit_temp = (kelvin_temp * 9/5) - 459.67;
            const location = response.data.name;        
            const celcius_temp = parseInt(kelvin_temp - 273.15);        
            const png_icon = response.data.weather[0].icon;        
            
            resp.writeHead(200 , {"Content-type" : "text/html"}) ;
            var content = fs.readFileSync("./weather.html","utf-8");
            //const weatherFile = fs.createReadStream('./weather.html' , 'UTF-8');
        
            var view = { location:location, tempval:celcius_temp , pngIcon:png_icon } // replacing placeholder in html file
            var output = mustache.render(content, view);
            resp.write(output);
            resp.end();
        })    
        .catch(error => console.log('Error', error));    // handle error
    }).listen(3000,'localhost');








/*   

const http = require('http');
const fs = require('fs');
const requests = require('requests');

const replaceValue = (tempVal , orgVal) => { 
 //let temperature = tempVal.toString().replace("{%tempval%}", orgVal.main.temp);
 //temperature = temperature.toString().replace("{%location%}",  orgVal.name);

let temperature = tempVal.replaceAll("{%tempval%}", "33");
temperature = temperature.replaceAll("{%location%}",  "Sakoli");  
return temperature;
} 

const server = http.createServer((req,resp)=>
{   
    resp.writeHead(200 , {"Content-type" : "text/html"}) ;
    const weatherFile = fs.createReadStream('./weather.html' , 'UTF-8');
    // weatherFile.pipe(resp);    
    if(req.url == "/")
    {
        requests('http://api.openweathermap.org/data/2.5/weather?q=Bhandara&appid=6af5c551a780f8227dd6111406d507bf')
        
        .on('data', (chunk) => 
        {   
            const weatherObjectData = JSON.parse(chunk); // converting JSON to Object data
            const arrObjData = [weatherObjectData];
           
            //console.log(arrObjData);
             
            // const realTimeData = arrObjData.map((val) => {
            //     replaceValue(weatherFile, val);     
            //     console.log(val);          
            // });
            
            
            const realTimeData = arrObjData.map((val) => replaceValue(weatherFile, val)).join(" ");
            
            //resp.write(realTimeData);  
            console.log(realTimeData);       
                                                                                                            
        })

        .on('end', (err) => 
        {
            if (err) return console.log('connection closed due to errors', err);
            resp.end();
        });
    }
});

server.listen(3000,'localhost',(err,data)=>{
console.log('Server Started');
});


*/