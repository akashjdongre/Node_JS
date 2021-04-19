var express = require('express');
var router = express.Router();

const { createClient } = require("pexels");

const client = createClient('563492ad6f9170000100000183082b7cfc5445169c5f57bb994fbd18');
// const query = 'window 10 wallpaper';

/* GET home page. */

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' , fullName : 'Akash J Dongre'});
});

router.get('/tapglobe/:search', function(req, res, next) 
{ 
  const query = req.params.search;

    client.photos.search({ query , per_page: 25 }).then(photos =>   // handle success
    {     
        const  images = photos.photos;        
        res.render('tapglobe', { title: 'Tapglobe' , fullName : 'Akash J Dongre' , images : images });
        //res.send(images);
    });


});

router.get('/contact-us', function(req, res, next) {
  res.render('tapglobe', { title: 'Tapglobe' , fullName : 'Akash J Dongre'});
});

router.get('/talent', function(req, res, next) {
  res.render('tapglobe', { title: 'Tapglobe' , fullName : 'Akash J Dongre'});
});

router.get('/about-us', function(req, res, next) {
  res.render('tapglobe', { title: 'Tapglobe' , fullName : 'Akash J Dongre'});
});

module.exports = router;
