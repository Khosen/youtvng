//'use strict';
const express = require('express');
const router = express.Router();
const multer =require('multer');
const path = require('path');
const mongoose = require('mongoose');

//bring in model
const postdb = require('../models/programmes');
const tvProgram = require("../models/tvPrograms");
const commentsDB= require("../models/comments");
const songsdb = require("../models/songsdb");
//const prog = require('../models/prog');
//bring in niominee model


/*router.get('/createProg', function(req, res){
 
   res.render('createProg'); 
 });*/

/* this section retrieves data to display on the various nav pages for all archives*/

 router.get('/youNews', (req, res)=>{

    
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'YouNews'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{
// get a record of sports to display on client side
    postdb.aggregate([
        
    {$match: {'subcategory.name': 'YouSports'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
 {$sample:{size:1}}, {$sort:{"date":-1}}], //,{$limit:4}
  
   function(err, sports){
    if (err){
       console.log(err);
   }
  else{
  //get a record of music to display on slinet side
   postdb.aggregate([
        
      {$match: {'subcategory.name': 'YouMusic'}},
       
      {$unwind:"$subcategory"},
     {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
      commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
      topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
    news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
      postlink:"$subcategory.postlink", counter:"$subcategory.count"}}}, 
    
      {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory",
      commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
      topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
    duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
    postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
    {$sample:{size:1}},{$sort:{"date":-1}}], //,{$limit:4}
    
     function(err, music){
      if (err){
         console.log(err);
     }
    else{
    //get a rcord of movies to display on client side
   postdb.aggregate([
        
    {$match: {'subcategory.name': 'YouMovies'}},
     
    {$unwind:"$subcategory"},
   {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}}, 
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory",
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sample:{size:1}},{$sort:{"date":-1}}], //,{$limit:4}
  
   function(err, movies){
    if (err){
       console.log(err);
   }
  else{
    postdb.aggregate([
        
      {$match: {'subcategory.name': 'LifeStyle'}},
       
      {$unwind:"$subcategory"},
     {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
      commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
      topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
    news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
      postlink:"$subcategory.postlink", counter:"$subcategory.count"}}}, 
    
      {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory",
      commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
      topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
    duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
    postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
    {$sample:{size:1}},{$sort:{"date":-1}}], //,{$limit:4}
    
     function(err, lifestyle){
      if (err){
         console.log(err);
     }
    else{
      postdb.aggregate([
        
        {$match: {'subcategory.name': 'Tourism&Wildlife'}},
         
        {$unwind:"$subcategory"},
       {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
        commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
        topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
      news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
        postlink:"$subcategory.postlink", counter:"$subcategory.count"}}}, 
      
        {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory",
        commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
        topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
      duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
      postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
      {$sample:{size:1}},{$sort:{"date":-1}}], //,{$limit:4}
      
       function(err, tourism){
        if (err){
           console.log(err);
       }
      else{
        postdb.aggregate([
        
          {$match: {'subcategory.name': 'Hospitality&Travel'}},
           
          {$unwind:"$subcategory"},
         {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
          commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
          topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
        news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
          postlink:"$subcategory.postlink", counter:"$subcategory.count"}}}, 
        
          {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory",
          commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
          topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
        duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
        postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
        {$sample:{size:1}},{$sort:{"date":-1}}], //,{$limit:4}
        
         function(err, travel){
          if (err){
             console.log(err);
         }
         else{
          postdb.aggregate([
        
            {$match: {'subcategory.name': 'YouDiscovery'}},
             
            {$unwind:"$subcategory"},
           {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
            commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
            topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
          news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
            postlink:"$subcategory.postlink", counter:"$subcategory.count"}}}, 
          
            {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory",
            commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
            topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
          duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
          postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
          {$sample:{size:1}},{$sort:{"date":-1}}], //,{$limit:4}
          
        
          function(err, discovery){
            if (err){
               console.log(err);
           }
         else{
          postdb.aggregate([
        
            {$match: {'subcategory.name': 'YouBiz&Tech'}},
             
            {$unwind:"$subcategory"},
           {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
            commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
            topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
          news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
            postlink:"$subcategory.postlink", counter:"$subcategory.count"}}}, 
          
            {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory",
            commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
            topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
          duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
          postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
          {$sample:{size:1}},{$sort:{"date":-1}}], //,{$limit:4}
          
                 
         function(err, biztech){
          if (err){
             console.log(err);
         }
        else{
        
         // console.log(movies);
           res.render('youNews', {docs:docs, sports:sports, music:music,
             movies:movies, lifestyle:lifestyle, tourism:tourism, travel:travel,
              biztech:biztech, discovery:discovery });
             // console.log(comments +"docs" +"counterdetails");
           
            } });
       }   });
       }  });
     }   });
      }  });
    }    });
     /* router.get('/youNews2', (req, res)=>{
         res.render('youNews2', {docs:docs});
      });*/
     
}    });
    } });
}   });
  });

router.get('/youEntertainment', (req, res)=>{

  res.render('youEntertainment');
});


router.get('/youfashion', (req, res)=>{
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'FashionCatalogue'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{

   // console.log(docs);
    res.render('youfashion', {docs:docs });
      // console.log(comments +"docs" +"counterdetails");

  }
});
});




router.get('/YouPersonality', (req, res)=>{
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'YouPersonality'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{

   // console.log(docs);
    res.render('YouPersonality', {docs:docs });
      // console.log(comments +"docs" +"counterdetails");

  }
});
});



router.get('/artiste', (req, res)=>{
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'TheArtisteTimeline'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{

    //console.log(docs);
    res.render('artiste', {docs:docs });
      // console.log(comments +"docs" +"counterdetails");

  }
});
});

router.get('/sound', (req, res)=>{
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'SoundCruz'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{

   // console.log(docs);
    res.render('sound', {docs:docs });
      // console.log(comments +"docs" +"counterdetails");

  }
});
});

router.get('/youwoman', (req, res)=>{
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'YouWoman'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] },slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{

  //  console.log(docs);
    res.render('youwoman', {docs:docs });
      // console.log(comments +"docs" +"counterdetails");

  }
});
});



router.get('/beatbox', (req, res)=>{
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'BeatBoxwithBoomba'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{

    console.log(docs);
    res.render('beatbox', {docs:docs });
      // console.log(comments +"docs" +"counterdetails");

  }
});
});

router.get('/ruralvoices', (req, res)=>{
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'The Rural Voices'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{

   // console.log(docs);
    res.render('ruralvoices', {docs:docs });
      // console.log(comments +"docs" +"counterdetails");

  }
});
});


router.get('/lifestyle', (req, res)=>{
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'LifeStyle'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts",slug:"$subcategory.slug",  viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{

   // console.log(docs);
    res.render('lifestyle', {docs:docs });
      // console.log(comments +"docs" +"counterdetails");

  }
});

});



router.get('/tourism', (req, res)=>{
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'Tourism&Wildlife'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{

    //console.log(docs);
    res.render('tourism', {docs:docs });
      // console.log(comments +"docs" +"counterdetails");

  }
});

});



router.get('/travel', (req, res)=>{
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'Hospitality&Travel'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] }, slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{

   // console.log(docs);
    res.render('travel', {docs:docs });
      // console.log(comments +"docs" +"counterdetails");

  }
});

});
  
router.get('/youmusic', (req, res)=>{
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'YouMusic'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] },slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{

   // console.log(docs);
    res.render('youmusic', {docs:docs });
      // console.log(comments +"docs" +"counterdetails");

  }
});

 
});

  
router.get('/youmovies', (req, res)=>{
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'YouMovies'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] },slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{

  //  console.log(docs);
    res.render('youmovies', {docs:docs });
      // console.log(comments +"docs" +"counterdetails");

  }
});

});

  

router.get('/yousports', (req, res)=>{
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'YouSports'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] },slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{

    console.log(docs);
    res.render('yousports', {docs:docs });
      // console.log(comments +"docs" +"counterdetails");

  }
});

  //res.render('yousports');
});


  
router.get('/YouDiscovery', (req, res)=>{
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'YouDiscovery'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] },slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{

  //  console.log(docs);
    res.render('YouDiscovery', {docs:docs });
      // console.log(comments +"docs" +"counterdetails");

  }
});

});

  
  
router.get('/YouBiz&Tech', (req, res)=>{
  postdb.aggregate([
    //display archive of all the news
     
    {$match: {'subcategory.name': 'YouBiz&Tech'}},
     
    {$unwind:"$subcategory"},
    {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
    commentCounts:"$commentCounts", clicks: "$clickCounts", slug:"$subcategory.slug", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
  
    {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
    commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] },slug: "$_id.slug",
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"date":-1}}], //,{$limit:4}

   function(err, docs){
    if (err){
       console.log(err);
   }
  else{

  //  console.log(docs);
    res.render('YouBiz&Tech', {docs:docs });
      // console.log(comments +"docs" +"counterdetails");

  }
});

});

  
router.get('/youDownloads', (req,res)=>{
 
  songsdb.aggregate([
    //  {$match:{'_id':{$in: [mongoose.Types.ObjectId(req.params._id)] } }},
//{$match:{ 'slug': { $eq: req.params.slug } }},
    {$project:
      {musicfile:1,
      title:1,
       artist:1,
       albumArt:1,
       slug:1,
       genre:1,
     //  'date': { $substr: ["$date", 0, 10] },
    
      _id:1}}


  ], function(err, docs){

     if (err) {
        
      console.log(err + "the error");
  
      } else {
    
res.render('youDownloads', {docs:docs});
  //res.render('posts', {category:docs});
//console.log(req.params.slug +'here')
      }
      })//.sort({ date: 1 });

})


  
module.exports = router;
