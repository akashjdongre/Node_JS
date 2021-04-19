const http = require('http');
const fs = require('fs');
const path = require('path');
const mustache   = require('mustache');

const { createClient } = require("pexels");
const client = createClient('563492ad6f9170000100000183082b7cfc5445169c5f57bb994fbd18');
const query = 'Nature';

const server = http.createServer((req,resp) => 
{   
    if(req.url == '/')
    {
        fs.readFile('./image_gal.html' , 'utf-8' , (err,data)=>
        {
            client.photos.search({ query, per_page: 30 }).then(photos =>   // handle success
            {     
                console.log(photos.photos);
                //var content = fs.readFileSync("./image_gal.html","utf-8");
                var view = { images : photos.photos } ;
                var output = mustache.render(data, view);
                resp.write(output);
                resp.end();
            });


        })
    }

    if(req.url.match("\.css$"))
    {   
        resp.writeHead('200' , {"content-tyep" : "text/css"});
        const cssPath = path.join(__dirname, '' , req.url);
        const read_stream_01 = fs.createReadStream(cssPath);        
        read_stream_01.pipe(resp)
    }
    else if(req.url.match("\.png$"))
    {   
        resp.writeHead('200' , {"content-tyep" : "image/png"});
        const imgPath = path.join(__dirname, '/' , req.url);
        const read_stream_03 = fs.createReadStream(imgPath);
        read_stream_03.pipe(resp);
    }
    else{
        resp.writeHead('404' , {"content-tyep" : "text/html"});
    }

}).listen(3030 , 'localhost' , (err,data)=>{
    console.log('server started on port 3030');
});