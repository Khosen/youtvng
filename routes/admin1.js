const express = require('express');
const async = require('async');
//const {check, validationResult} = require('express-validator');
const {ensureAuthenticated} = require('../config/auth')
const{ensureAuth}= require('../config/auth');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');
const postdb = require("../models/programmes");
const tvProgram = require("../models/tvPrograms");
const comments = require("../models/comments");
const { render } = require('ejs');
const multer = require('multer');
const { db } = require('../models/user');
 path = require('path');

//set storage engine//
var storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    
    }
    });
    
    //init upload
    var upload = multer({
    storage: storage,
    limits: { fileSize: 11000000 },
    
    // transformation: [{ width: 500, height: 500, crop: "limit" }]
    //var upload = multer({ storage : storage }).array('userPhoto',2);
    
    fileFilter: function(req, file, cb) {
    checkFileType(file, cb);
    }
    }).array('image', 10);
    
    
    //check file type
    function checkFileType(file, cb) {
    //allowed ext
    const filetypes = /png|jpg|jpeg/;
    //check extension
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
    return cb(null, true);
    
    } else {
    cb('Error: only jpeg, jpg, and png allowed');
    }
    }


    router.get('/createProg', (req, res) => {

        res.render('createProg');
        });
        
        //add new programs docs to db
        router.post('/createProg', (req, res) => {
        
        req.checkBody('inputSub', 'Topic is required').notEmpty();
        req.checkBody('inputCategory', 'Author is required').notEmpty();
        
        
        let errors = req.validationErrors();
        //ensure required fields are filled
        if (errors) {
        req.flash('danger', 'please ensure fields are properly filled!!');
        console.log(errors + 'here' + req.validationErrors())
        return;
        }
        
        const docs = {
        name: req.body.inputSub,
        date: new Date(Date.now())
        
        }
        let newProg = new tvProgram({
        
        category: req.body.inputCategory,
        date: new Date(Date.now()),
        subCategory: docs
        });
        
        
        
        //save newly created progs to db
        tvProgram.createProg(newProg, (err, newProg) => {
        if (err) throw err //{
        req.flash('success', 'Data saved');
        
        res.redirect('createProg');
        });
        
        });
        
        
        router.get('/updateProg', (req, res) => {
        tvProgram.find({}, function(err, docs, next) {
        if (err) {
        req.flash('danger', 'Data could not be retrieved!');
        
        //console.log(err +"heree");
        } else {
        res.render('updateProg', { category: docs });
        }
        }).sort({ category: 1 });
        });
        
        //  router.post()
        //update the list of programs already in subcategory after selecting which category to add
        router.post('/updateProg', (req, res) => {
        tvProgram.find({}, function(err, docs, next) {
        if (err) {
        req.flash('danger', 'Data could not be retrieved!');
        
        console.log(err + "heree");
        } else {
        res.render('updateProg', { category: docs });
        }
        }).sort({ category: 1 });
        // res.render('updateProg')
        });
        
        
        router.post('/updateSub', (req, res) => {
        const getCategory = req.body.categoryOption;
        const getsubCategory = {
        name: req.body.inputSub,
        date: new Date(Date.now())
        }
        
        console.log(getCategory + 'the category' +
        req.body.categoryOption + req.body.inputSub + getsubCategory);
        tvProgram.updateProg(getCategory, getsubCategory, (err, results) => {
        if (err) throw err;
        res.redirect('updateProg');
        })
        
        });
// db.inventory.find( { qty: { $ne: 20 } } )
//load ejs view with data from db esuring no empty values are loaded
router.get('/posts',  ensureAuthenticated,(req, res) => {
    tvProgram.find({ category: { $ne: null } }, function(err, docs, next) {
    if (err) {
    console.log(err + "the error");
    } else {
    //res.json('posts', {category:docs});
    // res.send(docs);
    res.render('posts', { message: req.flash('message'), category: docs });
    }
    }).sort({ category: 1 });
    
    });


    
    
    router.get('/getSubs', (req, res) => {
    
    tvProgram.aggregate([{ $unwind: "$subCategory" }, { $project: { _id: 0, category: 1, name: "$subCategory.name" } }, ],
    function(err, docs) {
    if (err) {
    console.log(err);
    } else {
    res.send(docs);
    //console.log(docs);
    }
    })
    
    });
    
router.get('/theValues', (req, res) => {
    res.render('posts');
    });
    
    
    router.post('/posts', (req, res) => {
    upload(req, res, (err) => {
    if (err) {
    console.log(err);
    
    req.flash('danger', err.toString());
    res.redirect('posts');
    } else {
    //ensure images r not empty
    if (req.files === undefined || req.files.length == 0) {
    
    req.flash('danger', "No image file selcted!!!");
    res.redirect('posts');
    } else {
    
    var filenames = req.files.map(function(file) {
    
    return `uploads/` + file.filename; // or file.originalname
    });
    
    console.log(filenames);
    
    
//  console.log(filenames);
//split paragraphs into arrays
var fullNews = req.body.news;
var splitNews = fullNews.split('\r\n');
//add docs to variable to be saved
var slug = req.body.inputTopic;
const postdocs = {
name: req.body.sCategoryOption,
// topic:req.body.inputTopic,
topic: req.body.inputTopic,
date: new Date(),
slugify: slug,
//date:new Date(req.body.date),
postLink: req.body.inputLink,
author: req.body.inputAuthor,
duration: req.body.inputDuration,
news: splitNews,

//photo:`uploads/${req.file.filename}`
photo: filenames,
count: 1

}


let post = new postdb({
_id: new mongoose.Types.ObjectId(),
category: req.body.catOption,
//date:new Date(req.body.date),

date: new Date(),
subcategory: postdocs,
commentCounts: 0
//postId:_id                    
});

let getQuery = req.body.catOption;
let getSub = req.body.sCategoryOption;
let topic = req.body.inputTopic;
//find post and add comment
postdb.find({ category: req.body.catOption, 'subcategory.name': req.body.sCategoryOption }, (err, results) => {
if (err) throw err;
if (results) {
let addComment = new comments({
    //_id:new mongoose.Types.ObjectId(),
    topic: topic,
    postId: post._id,
    category: getSub,
    commentCounts: 0,
    clickCounts: 0,
    viewCounts: 0
});
//testDocs.save();
//creating a new post
postdb.createPost(post, getQuery, getSub, topic, addComment, (err, newPost) => {
    if (err) throw err //{
        //req.flash('success', 'Data saved');
        //     console.log(getSub + getQuery)
        //  res.redirect('posts');

});
// console.log(results);
}
})
req.flash('message', 'Data saved');


res.redirect('posts');

}
//
// console.log(req.files);
}

// }


});

});


router.get('/login', (req, res) => {
    // req.flash('message');
    res.render('login', {
        message: req.flash('error')
    });
});
                


router.get('/menu', ensureAuthenticated,(req, res) => {
    // req.flash('message');
    res.render('menu');
});


router.get('/topicList',(req, res) => {
    // req.flash('message');
    res.render('topicList');
});
    
        

router.get('/register', (req, res) => {
    res.render('register');
});


var date = Date.now();
    //Register user


router.get('/confirmPage', (req, res) => {
    res.render('confirmPage', { message: req.flash('message') });
});



router.get('/approvePosts', (req, res) => {
    res.render('approvePosts');
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('error', 'You are logged out');
    res.redirect('/users/adminConsole');
});


router.get('/dashboard', (req, res) =>{
    async.parallel({
        users: function(callback){
            if(req.isAuthenticated()){
               // User.find({}, {name:1, email:1,  date: {$substr: ["$date", 0, 10]},
               // });
                User.aggregate([
                    {
                        $match:{loginStatus:'online' }
                           
                    },
                    {

                    $group:{
                        _id:{
                            name:'$name',
                            role:'$role',
                            email:'$email',
                            date: {
                                $substr: ['$loginDate', 0, 10]
                            },
                            time: {
                                $substr: ['$loginDate', 11, 9]
                                 }
                             }
                         }
                     },

                    { $project:
                            {
                        _id:0,
                        name: '$_id.name',
                        role:'$_id.role',
                        email:'$_id.email',
                        date: '$_id.date',
                        time:'$_id.time'
                         }
                     }
                ], (err, recs)=>{
                    if(err){
                        callback(err);
                    }else{
                      //  console.log(recs)
                        callback(null, recs);
    
                    }
                })
            }
        },
        category: function(callback){

            tvProgram.find({ category: { $ne: null } },
             (err, recs)=>
             {
                if (err) {
                callback(err)
                } else {
               callback(null, recs)
                }
                }).sort({ category: 1 });
          },
      
        role: function(callback){
            User.aggregate([{
                $match:{role:"Admin"}//{$in:["SuperAdmin", "Admin"]}}
            },
            {
                $group:{
                    _id: "$role"
                }
            },
            {
                $project:{
                    
                    role:'$_id.role'
                }
            }
        ], (err, recs)=>{
            if(err){
                callback(err);
            }else{
                callback(null, recs)
            }
        });
        }
    },    (err, results)=>{
       // console.log(results)
       // res.json(results);
        res.render('dashboard', {users:results.users, category:results.category, role:results.role});
    })
   
});




router.post('/dashboard', (req, res) => {
    upload(req, res, (err) => {
    if (err) {
    console.log(err);
    
    req.flash('danger', err.toString());
    res.redirect('dashboard');
    } else {
    //ensure images r not empty
    if (req.files === undefined || req.files.length == 0) {
    
    req.flash('danger', "No image file selcted!!!");
    res.redirect('dashboard');
    } else {
    
    var filenames = req.files.map(function(file) {
    
    return `uploads/` + file.filename; // or file.originalname
    });
    
    console.log(filenames);
    
    
//  console.log(filenames);
//split paragraphs into arrays
var fullNews = req.body.news;
var splitNews = fullNews.split('\r\n');
//add docs to variable to be saved
var slug = req.body.inputTopic;
const postdocs = {
name: req.body.sCategoryOption,
// topic:req.body.inputTopic,
topic: req.body.inputTopic,
date: new Date(),
slugify: slug,
//date:new Date(req.body.date),
postLink: req.body.inputLink,
author: req.body.inputAuthor,
duration: req.body.inputDuration,
news: splitNews,
approveStatus:Boolean(req.body.approve),
postStatus:"pending",
//photo:`uploads/${req.file.filename}`
photo: filenames,
count: 1

}


let post = new postdb({
_id: new mongoose.Types.ObjectId(),
category: req.body.catOption,
//date:new Date(req.body.date),

date: new Date(),
subcategory: postdocs,
commentCounts: 0
//postId:_id                    
});

let getQuery = req.body.catOption;
let getSub = req.body.sCategoryOption;
let topic = req.body.inputTopic;
//find post and add comment
postdb.find({ category: req.body.catOption, 'subcategory.name': req.body.sCategoryOption }, (err, results) => {
if (err) throw err;
if (results) {
let addComment = new comments({
    //_id:new mongoose.Types.ObjectId(),
    topic: topic,
    postId: post._id,
    category: getSub,
    commentCounts: 0,
    clickCounts: 0,
    viewCounts: 0
});
//testDocs.save();
//creating a new post
postdb.createPost(post, getQuery, getSub, topic, addComment, (err, newPost) => {
    if (err) throw err //{
        //req.flash('success', 'Data saved');
        //     console.log(getSub + getQuery)
        //  res.redirect('posts');

});
// console.log(results);
}
})
req.flash('message', 'Data saved');


res.redirect('dashboard');

}

}


});

});



router.get('/users', (req, res) => {
    User.aggregate([
        {
            $match:
            {  
                $and:[
                    {role:{$nin:["SuperAdmin", "Admin"]}, status:false}
                ]
              
            },
           

        },
        {
            $project:
            {
              name:1,
              email:1,
              date: {
                $substr: [new Date(), 0, 10]
            },   
            }
        }
], (err, users)=>{
    if(err) throw err;
     //console.log(users);
     res.render('users', {users:users});
});
    
});


router.post('/users', (req, res)=>{
  
  //  req.body.approve =Boolean(req.body.approve);
   const{name, email, role, approve} = req.body;
   const values = req.body;
 // console.log(values);
   res.json('her');
   // console.log(email + "status" +approve)
    for(i=0 ; i<= email.length; i++){
       if(approve [i]=== "true" ){
           /* User.updateOne({email:email[i]},{$set:{role:role[i], status:approve}}, (err)=>{
                if(err) {
                    console.log(err)
                }else{
                    console.log("inhere");
                }
            
        });*/
     //   console.log(email[i])
       // console.log(req.body.email[i], role[i])
        }
   }
   
} );

module.exports = router;