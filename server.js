'use strict';
require('dotenv').config({silent: true});

const express       = require('express'),
      app           = express(),
      path 	        = require('path'),
      mongoose      = require('mongoose'),
      morgan 		= require('morgan'),
      bodyParser 	= require('body-parser'),
      routes 		= require(path.resolve('./core/routes')),
      http          = require('http').Server(app),
      config 		= require(require(path.resolve('./core/env')).getEnv),
      PORT          = process.env.PORT || 8000;


     
mongoose.set('debug', config.db.DEBUG);
mongoose.connect(config.db.URL);

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


app.use(express.static(path.resolve('./admin')));
app.use('/assets', express.static(path.resolve('./assets')));

app.use(morgan('dev'));

app.use('/adminapi',routes.admin)

app.use(function(req,res){
    res.sendFile(path.resolve('./admin/index.html'));
});

http.listen(PORT, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('listening on *:' + PORT);
    }
});
    


