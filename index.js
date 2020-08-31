const express = require("express");
var startdebug = require('debug')('app:startup')
var dbdebug = require('debug')('app:db')

const Joi = require("joi");
const app = express();
const helmet = require("helmet");
const morgan = require('morgan');
const auth = require('./logger');
const courses = require('./routes/courses');
const home = require('./routes/home');

//initiation au middleWare
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(auth);
app.use(helmet());
app.use(morgan('tiny'));
app.set('view engine','pug');
app.set('views','./views');//default view
app.set('/api/courses',courses);//default view
app.set('/',home);//default view

dbdebug('Connect to the database ...')



app.listen(3000);
console.log("le serveur ecoute sur le  port : 3000 ...");
