const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const songSchema = mongoose.Schema({
    _id: Schema.Types.ObjectId,
    title:{
        type: String,
       
        trim:true
        
    },
   
    date:{
        type:Date
    },
    artist:{
        type: String,
       
        trim:true
        
    },
    slug: { type: String, 
        slug: "title"} ,

    genre:{
        type: String,
        
        trim:true
        
    },
    musicfile:{
        type: String,
        unique: true,
        trim:true
        
    },
   
    uploadedBy:{
        type: String,
     
        trim:true
        
    },
    albumArt:{
        type: String,
     
        trim:true
        
    }
   
   
   
});
const songdb= module.exports=mongoose.model('songdb', songSchema);


//ucreate song

module.exports.createPost = function(post, callback){
  //  Prog.updateMany({category:getQuery, 'subcategory.name':getSub},{ $inc:{'subcategory.$.count':1}}, callback)
     
    post.save(callback);
   // console.log(post +'this post');
  
    // addComment.save();
    
  }
      
     