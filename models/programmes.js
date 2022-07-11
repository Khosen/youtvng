
const slug = require('mongoose-slug-updater');

const mongoose = require('mongoose');
 const comments = require("./comments");
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
//var pTest = require("./pTest");

mongoose.plugin(slug);

const progSchema = mongoose.Schema({
  _id: Schema.Types.ObjectId,
category: 
{
    type: String,
    required: true,
     trim:true
    },
date:{
    type:Date,
    required:true
},
commentCounts:{ type:Number},
clickCounts:{ type:Number},
viewCounts:{ type:Number},
approveStatus:{type: Boolean,
  default: false},
  postedBy:{type:String,
    trim:true},
 posterRole:{type:String,
  trim:true},
postStatus:{type:String,
trim:true},
subcategory:[{
    name:{
        type:String,
         trim: true,
         index:{
          unique:true,
          partialFilterExpression: {name:{$type: "string"}}
      }
      },
      topic:{
        type:String,
        required:true,
        trim: true,

      },
      slugify: {type:String},
      slug: { type: String, slug: "topic"} ,

      date:{
          type:Date,
          required:true
      },
      postlink:{
         type:String,
          trim:true
          },
    author:{
         type:String,
         
         trim: true
         },
    duration :{
        type:String,
         trim: true
    },
    news:[{
      
        type:String,
        trim: true
             
      }],
      photo:[{
        type: String,
       required:true,
       trim:true
    }],
   
    count:{type:Number}
   }],
  //postId:Number,
 
  
});

const Prog = module.exports= mongoose.model('Prog', progSchema);


/*module.exports.createPost = function(post, getQuery, getSub, topic, addComment, callback){
  Prog.updateMany({category:getQuery, 'subcategory.name':getSub},{ $inc:{'subcategory.$.count':1}}, callback)
   
  post.save(callback);
  console.log(post +'this post');

   addComment.save();
  
}*/



module.exports.createPost = function(post, getQuery, getSub, topic, addComment, callback){
  Prog.updateMany({category:getQuery, 'subcategory.name':getSub},{ $inc:{'subcategory.$.count':1}}, callback)
   
  post.save(callback);
  console.log(post +'this post');

   addComment.save();
  
}
/*module.exports.updateProg=function( getId, getName, post, gettopic, getsubCategory, callback){
   
  //const 
tvProgram.updateOne({_id:getId, 'subcategory._id':getName},
{ $set:{'subcategory.$.topic':gettopic}}, callback)

post.save(callback);
console.log(post + getName + gettopic);
}*/

/*module.exports.getData = function(postid, callback){
  postdb.aggregate([
    {$match: {'_id': {$in:[mongoose.Types.ObjectId(postid) ]}}},
    {$unwind:"$subcategory"},

   // {$match:{"$subcategory.name": "YouSports"}},
    {$group:{_id:{category:"$category", commentCounts:"$commentCounts", clicks: "$clickCounts", 
    subcategory:"$subcategory.name",  postId:"$_id", viewCounts:"$viewCounts",
    topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
  news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},
  duration:"$subcategory.duration",
    postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},


  //{$match:{'subcategory.name':"YouSports"}},
    {$project:{_id:0, category:"$_id.category",  commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",
    subcategory:"$_id.subcategory",  viewCounts:"$_id.viewCounts",
    topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
  duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] },
  postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
  {$sort:{"_id.date":1}}   ],
   function(err, docs){
        
    if(err){
      console.log(err);
  }else{

    postdb.aggregate([
      {$unwind:"$subcategory"},
      {$group:{_id:{category:"$category", subcategory:"$subcategory.name",  postId:"$_id",
      commentCounts:"$commentCounts", clicks: "$clickCounts", viewCounts:"$viewCounts",
      topic:"$subcategory.topic", photo:"$subcategory.photo", author:"$subcategory.author",
    news:"$subcategory.news", date:{$substr:["$subcategory.date", 0,10]}, time:{$substr:["$subcategory.date", 11,9]},duration:"$subcategory.duration",
      postlink:"$subcategory.postlink", counter:"$subcategory.count"}}},
    
      {$project:{_id:0, category:"$_id.category", subcategory:"$_id.subcategory", 
      commentCounts: "$_id.commentCounts",  clicks: "$_id.clicks",viewCounts:"$_id.viewCounts",
      topic:"$_id.topic", author:"$_id.author", news:"$_id.news", postId:"$_id.postId",
    duration:"$_id.duration", photo: { $arrayElemAt: [ "$_id.photo", 0 ] },
    postlink:"$_id.postlink", date:"$_id.date", time:"$_id.time", counter:"$_id.counter"}} ,
    {$sort:{"_id.date":1}}], //,{$limit:4}

     function(err, counterDetails){
      if (err){
         console.log(err);
     }
    else{
console.log(docs + "the docs") ;
//  res.render('sports');
  //res.render('sports', { docs:docs , details:counterDetails});
  
  }



});
}

//}
});
}*/
