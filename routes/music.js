
const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {check, validationResult} = require('express-validator/check');
const mongoose = require('mongoose');
const { Readable } = require('stream');
const {ensureAuthenticated} = require('../config/auth');
const User = require('../models/user');
const postdb = require("../models/programmes");
const tvProgram = require("../models/tvPrograms");
const comments = require("../models/comments");
const songsdb = require("../models/songsdb");
const { render } = require('ejs');
 path = require('path');





//set storage engine//
var storage = multer.diskStorage({
    destination:function (req, file, cb) {
        if (file.mimetype === 'audio/mp3'||file.mimetype === 'audio/mpeg') {
          cb(null, './public/music')
        } else if (file.mimetype === 'image/jpg'||file.mimetype === 'image/jpeg' ||file.mimetype === 'image/png') {
          cb(null, './public/musicuploads')
          console.log(file.mimetype +"the file");
        } else {
          console.log(file.mimetype)
          
          //req.flash('message', cb.toString());
          
          cb({ error: 'Mime type not supported' })
        }
      },//)// './public/music',
    filename: function(req, file, cb) {
    //cb(null, "youTV" + '-' + Date.now() + path.extname(file.originalname));
    cb(null, "youtvng" + '-' + file.originalname);//+ path.extname(file.originalname));
 
   //.log(file + "the filename");
  
    }
    });
  
    //init upload
    var upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 },
     
    fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
 
    }
    }).fields([{
        name: 'music', maxCount: 1
      }, {
        name: 'image', maxCount: 1
      }])//[('music');
    
    
    //check file type
    function checkFileType(file, cb) {
    //allowed ext
    const filetypes = /|mp3|jpg|jpeg|png|mpeg|/;
    //check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
    return cb(null, true);
    
    } else {
    cb('Error: only mp3 mimetype allowed');

    }
    }

    
    router.get('/uploadSong', (req, res)=>{
        res.render('uploadSong', {message:req.flash('message')});
    });

    router.post('/uploadSong', (req, res)=>{
//use the upload function to  get the images and audio to the db
        upload(req, res, (err) => {
            if (err) {
           
            console.log(err);
            
            req.flash('message', err.toString());
            res.redirect('uploadSong');
            } else {
            //ensure images r not empty
            if (req.files=== undefined || req.files.length == 0) {
            
            req.flash('message', "No music file selcted!!!");
            res.redirect('uploadSong');
            } else {
               
            }
           // console.log( filenames+"filenames");
        let post = new songsdb({
        _id: new mongoose.Types.ObjectId(),
        title: req.body.title,
        
        artist: req.body.artist,
        date: new Date(),
        genre: req.body.genre,
        musicfile: `music/${req.files['music'][0].filename}`,
        albumArt: `musicuploads/${req.files['image'][0].filename}`,
       uploadedBy: "me"               
        });
        console.log(post)
        /*let getQuery = req.body.catOption;
        let getSub = req.body.sCategoryOption;
        let topic = req.body.inputTopic;*/
       
        //creating a new post
        songsdb.createPost(post, (err, newPost) => {
            if (err) throw err ;//{
                //req.flash('success', 'Data saved');
                //     console.log(getSub + getQuery)
                //  res.redirect('posts');
        
       // });
        // console.log(results);
      // }
      //});
        req.flash('message', 'Data saved');
        
        
        res.redirect('uploadSong');
///  });
        });
    }
    });
//}
    
  //  });
  //  }
       // res.render('upload');
    });

    router.get('/downloads', (req, res)=>{
        
        songsdb.aggregate([
          //  {$match:{'_id':{$in: [mongoose.Types.ObjectId(req.params._id)] } }},
//{$match:{ 'slug': { $eq: req.params.slug } }},
          {$project:
            {musicfile:1,
            title:1,
            albumArt:1,
             artist:1,
             genre:1,
           //  'date': { $substr: ["$date", 0, 10] },
          
            _id:1}}


        ], function(err, docs){

           if (err) {
              
            console.log(err + "the error");
        
            } else {
          
     res.render('downloads', {docs:docs});
        //res.render('posts', {category:docs});
        console.log(req.params.slug +'here')
            }
            }).sort({ date: 1 });

    });


        router.get('/downloads/:slug', (req, res)=>{

            songsdb.aggregate([
                {$match:{ 'slug': { $eq: req.params.slug } }},//{'_id':{$in: [mongoose.Types.ObjectId(req.params._id)] } }},
                {$project:
                {musicfile:1,
                title:1,
                albumArt:1,
                genre:1,
                 artist:1,
//'date': { $substr: ["$date", 0, 10] },
          
                _id:1}}


            ], function(err, docs){

               if (err) {
                  
                console.log(err + "the error");
            
                } else {
              
         res.render('downloads', {docs:docs});
         console.log(docs[0].date)
            //res.render('posts', {category:docs});
                }
                }).sort({ 'date': -1 });
           // res.render('downloads', {docs:docs});
        });

//router.get('music', (req, res)=>{
 //   res.render('music');
//});












module.exports = router;