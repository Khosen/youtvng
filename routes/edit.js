const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {check, validationResult} = require('express-validator/check');
const mongoose = require('mongoose');
//const check = require('express-validator').check;
//const validationResult = require('express-validator/check').validationResult;
const User = require('../models/user');
const postdb = require("../models/programmes");
const tvProgram = require("../models/tvPrograms");
const comments = require("../models/comments");
const { render } = require('ejs');
const multer = require('multer');
 path = require('path');
 var ObjectId = mongoose.Types.ObjectId;



 /*router.get('/topicList', (req, res)=>{
     postdb.aggregate([
         {$unwind: '$subcategory'},
       //  {$match: {'$subcategory.slug': {$eq: null}}},
         {$group: {_id:{id: '$_id', subid:'$subcategory._id', topic:'$subcategory.topic',
          name:'$subcategory.name', date: { $substr: ['$subcategory.date', 0, 10] },
          time: { $substr: ['$subcategory.date', 11, 9] }, author:'$subcategory.author'}}},

         {$project: {subid:'$_id.subid', topic:'$_id.topic', name:'$_id.name',  id:'$_id.id',
        date:'$_id.date', time:'$_id.time', author:'$_id.author', }},
        {$sort: {'_id.date':-1, '_id.time':-1}}, {$limit:15}
         
     ],
     function(err, docs){
         if(err) throw err;
         //console.log(docs)
    // res.render('topicList', {docs:docs});
     res.render('topicList', {message: req.flash('message') ,docs:docs});
  
     });
    
     //res.render('listTopics');
 });*/


 router.get('/editPosts', (req, res)=>{
    postdb.aggregate([
        {$unwind: '$subcategory'},
      //  {$match: {'$subcategory.slug': {$eq: null}}},
        {$group: {_id:{id: '$_id', subid:'$subcategory._id', topic:'$subcategory.topic',
         name:'$subcategory.name', date: { $substr: ['$subcategory.date', 0, 10] },
         time: { $substr: ['$subcategory.date', 11, 9] }, author:'$subcategory.author'}}},

        {$project: {subid:'$_id.subid', topic:'$_id.topic', name:'$_id.name',  id:'$_id.id',
       date:'$_id.date', time:'$_id.time', author:'$_id.author', }},
       {$sort: {'_id.date':-1, '_id.time':-1}}, {$limit:15}
        
    ],
    function(err, docs){
        if(err) throw err;
        //console.log(docs)
   // res.render('topicList', {docs:docs});
    res.render('editPosts', {message: req.flash('message') ,docs:docs});
 
    });
   
    //res.render('listTopics');
});
 router.get('/editNews/:id', (req, res)=>{
    postdb.aggregate([
        {$match: {'_id': {$in:[mongoose.Types.ObjectId(req.params.id) ]}}},
   
      //  {$match: {'_id': ObjectId(req.params.id)}}, //mongoose.Types.ObjectId(req.params.id) }},//{$in:[mongoose.Types.ObjectId(req.params.id) ]}}},
       //  {$match: {'_id': req.params.id}},
     
        {$unwind: '$subcategory'},
      //  {$match: {'$subcategory.slug': {$eq: null}}},
       {$group: {_id:{id: '$_id', subid:'$subcategory._id', topic:'$subcategory.topic', news:'$subcategory.news',
        slug:'$subcatgeory.slug'}}},

       {$project: {subid:'$_id.subid', topic:'$_id.topic', slug:'$_id.slug', id:'$_id.id', news:'$_id.news'}}
      // {$project: {subcategory:'$_id.subcategory', topic:'$_id.topic', slug:'$_id.slug', id:'$_id.id'}}
    ],
    function(err, docs){
        if(err){

         console.log(err);
        }
        console.log(docs[0].news +"lol" + req.params.id)
    res.render('editNews', {message: req.flash('message') ,docs:docs});
   // res.render('editNews', {docs:docs});
  
    });
   
    //res.render('listTopics');
});


 
 /*router.get('/editNews/:id', (req, res)=>{
    postdb.aggregate([
        {$match: {'_id': {$in:[mongoose.Types.ObjectId(req.params.id) ]}}},
   
      //  {$match: {'_id': ObjectId(req.params.id)}}, //mongoose.Types.ObjectId(req.params.id) }},//{$in:[mongoose.Types.ObjectId(req.params.id) ]}}},
       //  {$match: {'_id': req.params.id}},
     
        {$unwind: '$subcategory'},
      //  {$match: {'$subcategory.slug': {$eq: null}}},
       {$group: {_id:{id: '$_id', subid:'$subcategory._id', topic:'$subcategory.topic', news:'$subcategory.news',
        slug:'$subcatgeory.slug'}}},

       {$project: {subid:'$_id.subid', topic:'$_id.topic', slug:'$_id.slug', id:'$_id.id', news:'$_id.news'}}
      // {$project: {subcategory:'$_id.subcategory', topic:'$_id.topic', slug:'$_id.slug', id:'$_id.id'}}
    ],
    function(err, docs){
        if(err){

         console.log(err);
        }
        console.log(docs[0].news +"lol" + req.params.id)
    res.render('editNews', {message: req.flash('message') ,docs:docs});
   // res.render('editNews', {docs:docs});
  
    });
   
    //res.render('listTopics');
});*/

//router.post('/editNews/:id', (req, res)=>{
router.post('/editNews/:id', (req, res)=>{
    var fullNews = req.body.news;
    var splitNews = fullNews.split('\r\n');
    const postdocs = {
        news: splitNews

    }
    

/*let post = new postdb({
    
    subcategory: postdocs,
                 
    });*/
    let post = new postdb();
    //post.category.subcategory.topic= req.body.topic;
     post.category={
         subcategory:[{
             news: splitNews
         }]
     };
     let getName = req.body.inputTopic;
    let query =req.params.id; 
    console.log(query +"news" + splitNews + getName); 
    
    postdb.updateOne({_id:query, 'subcategory.topic':getName},
    { $set:{'subcategory.$.news':splitNews}}, (err)=>{
        if(err){
            console.log(err + query);
            return;
        }else{
            req.flash('success_msg', 'article edited');
           res.redirect('/admin/dashboard');
        }
    })
   

});

router.get('/postView/:id', (req, res)=>{
    postdb.aggregate([
        {$match: {'_id': {$in:[mongoose.Types.ObjectId(req.params.id) ]}}},
       {$unwind: '$subcategory'},
        {$group: {_id:{id: '$_id', subid:'$subcategory._id', topic:'$subcategory.topic', news:'$subcategory.news',
        slug:'$subcatgeory.slug'}}},

       {$project: {subid:'$_id.subid', topic:'$_id.topic', slug:'$_id.slug', id:'$_id.id', news:'$_id.news'}}
     ],
    function(err, docs){
        if(err){

         console.log(err);
        }
     res.render('postView', {message: req.flash('message') ,docs:docs});
  
    });
 
});

router.post('/postView/:id', (req, res)=>{
      var fullNews = req.body.news;
    var splitNews = fullNews.split('\r\n');
    const postdocs = {
        news: splitNews

    }
    
    let post = new postdb();
      post.category={
         subcategory:[{
             news: splitNews
         }]
     };
     let getName = req.body.inputTopic;
    let query =req.params.id; 
    console.log(query +"news" + splitNews + getName); 
    
   
    postdb.updateOne({_id:query, 'subcategory.topic':getName},
    { $set:{'subcategory.$.news':splitNews}}, (err)=>{
        if(err){
            console.log(err + query);
            return;
        }else{
            req.flash('success_msg', 'article has been edited, Please click on the approve button to approve');
           res.redirect('/admin/approvePosts');
        }
    })
   

});
router.get('/approve/:id', (req, res)=>{
  //  console.log(req.params.id + "here")

});
   

router.post('/approve/:id', (req, res)=>{

  postdb.updateOne({_id:req.params.id, 'subcategory.topic':req.body.topic}, {$set:{approveStatus:true}},
  (err)=>{
    if(err){
        console.log(err + query);
        return;
    }else{
        
        req.flash('success_msg', 'article edited');
        
  console.log("here" +req.body.topic +req.params.id);

 res.redirect('/admin/approvePosts');
    }
   // console.log(req.params.id + "here");
  })
});
   
 
 module.exports=router;