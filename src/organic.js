const express = require('express');
const fs = require('fs');
const hbs = require('hbs');
const path = require('path');
const app = express();

const staticPath = path.join(__dirname, '../public/organic'); // css,js,images path
const viewsPath = path.join(__dirname, '../public/organic'); // index.hbs path
const partialsDir = path.join(__dirname, '../public/partials'); // partial path

var filenames = fs.readdirSync(partialsDir);

app.set('view engine' , 'hbs');
app.set('views' , viewsPath);
app.use(express.static(staticPath));

const head_partial = fs.readFileSync(partialsDir + '/' + 'head.hbs', 'utf8'); // path for 'head.hbs' partial
const navbar_partial = fs.readFileSync(partialsDir + '/' + 'navbar.hbs', 'utf8'); // path for 'navbar.hbs' partial
const footer_partial = fs.readFileSync(partialsDir + '/' + 'footer.hbs', 'utf8'); // path for 'footer.hbs' partial

hbs.registerPartial('head', head_partial); // adding 'head.hbs' partial
hbs.registerPartial('navbar', navbar_partial); // adding 'navbar.hbs' partial
hbs.registerPartial('footer', footer_partial); // adding 'footer.hbs' partial

// var filenames = fs.readdirSync(partialsDir);
// filenames.forEach(function (filename) {
//     var matches = /^([^.]+).hbs$/.exec(filename);
//     if (!matches) {
//       return;
//     }
//     var name = matches[1];
//     var template = fs.readFileSync(partialsDir + '/' + filename, 'utf8');
//     hbs.registerPartial(name, template);
//   });


app.get('',(req,resp) => {
    resp.render('index')
});

app.get('/about-us',(req,resp) => {
    resp.render('page-about-us')
});

app.get('/services',(req,resp) => {
    resp.render('page-services')
});

app.get('/contact-us',(req,resp) => {
    resp.render('page-contact')
});

app.get('/faq',(req,resp) => {
    resp.render('page-faq')
});

app.get('/team',(req,resp) => {
    resp.render('page-team')
});

app.get('/testimonials',(req,resp) => {
    resp.render('page-testimonials')
});

app.get('*',(req,resp) => {
    resp.render('page-404')
});

app.listen(8000 , (err,data) => {
    console.log('Listen on PORT : 8000');
});