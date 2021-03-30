
const http = require('http');
const fs = require('fs');
const axios = require('axios');
const mustache   = require('mustache');

const server = http.createServer((req,resp)=>
{   
    resp.writeHead(200 , {"Content-type" : "text/html"}) ;

    const ENTIRE_API_URL = `https://reqres.in/api/users?page=1`; // fetch users from api
        
        axios.get(ENTIRE_API_URL)
        .then(response =>   // handle success
        {     
            var users = response.data.data;
            var content = fs.readFileSync("./users_lists.html","utf-8");
            var view = { userLists : users } ;
            var output = mustache.render(content, view);
            resp.write(output);
            resp.end();
        })    
        .catch(error => console.log('Error', error));    // handle error
}).listen(8080 , 'localhost' , (err, data)=>{
console.log('server started');
});