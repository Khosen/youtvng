//const express = require('express');
const express = require('express'),
 http = require('http');
 var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

var socket = require('socket.io-client')('http://localhost');
const path = require('path');
const bodyParser = require('body-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
//const  expressValidator= require('express-validator');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//const path = require('path');
const config = require('./config/databse');
const socketio = require('./socketio')(io);

require('./config/passport') (passport);
//connect database
/*mongoose.connect(config.database,  {useNewUrlParser:true});

//connect database
mongoose.connect(config.database, {useNewUrlParser:true});*/

mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true});

var options = {
  server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } }
};
//on connection
mongoose.connection.on('connected',() =>{
    console.log('connected to database' + config.database);
    //mongoose.set('useCreateIndex', true);

});

//on error
mongoose.connection.on('error', (err) =>{
    console.log('database error:' + err)
});



//var urlencodedParser = bodyParser.urlencoded({ extended: true });


//const app = express();
const port = process.env.PORT || 3000;//
//const port= 3000;




//set template engine
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

 
  
//define static path to use css files etc
app.use(logger('dev'));
//body parser and cookie parser middleware
//app.use(bodyParser.urlencoded({extended: false}));
app.use(express.urlencoded({extended: false}))
//parse application json
//app.use(bodyParser.json());
//parse application json
app.use(express.json());
app.use(cookieParser());
//app.use(express.bodyParser({uploadDir:'./uploads'}));

//app.use(cookieParser('secret'));

//use express session
app.use(session({
  secret: 'keyboard cat',
    resave: true,
  saveUninitialized: true,
 // cookie: { secure: true }
}));


//connect flass
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());


//define static folders u will use
app.use(express.static(path.join(__dirname, 'node_modules')));
//app.use(express.static(path.join(__dirname +'/node_modules/bootstrap/dist')));
app.use(express.static(path.join(__dirname, '/public')));

//messages middleware
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});
//app.use(expressValidator());
 /* //express messages middle ware
  app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});*/

//connect flass
//app.use(flash());

//express validator
 //express validator middleware
 //
 /*app.use(expressValidator({
    errorFormatter: function (param, msg, value){
      var namespace = param.split('.')
      , root = namespace.shift()
      , formParam = root;

      while(namespace.length){
        formParam  += '['+ namespace.shift() + ']';
      }
      return{
        param: formParam,
        msg: msg,
        value: value
      };
    }
  }));*/



//call all the routes
let  routes= require('./routes/index');
let programme = require('./routes/programme');
//let createProg = require('./routes/createProg');
let admin = require('./routes/admin');
let edit = require('./routes/edit');
let music = require('./routes/music');
let users = require('./routes/users');

//let imgupload = require('./routes/upload');
app.use('/', routes);
app.use('/programme', programme);
app.use('/admin', admin);
app.use('/edit', edit);
app.use('/music', music);
app.use('/users', users);
//app.use('/createProg', createProg);



  
server.listen(port, ()=>{
    console.log('server started on port'+port);
});



//});