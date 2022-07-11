
const slug = require('mongoose-slug-updater');

const mongoose = require('mongoose');
const Prog = require('./programmes');
const Schema = mongoose.Schema;

mongoose.plugin(slug);
const commentSchema = mongoose.Schema({

   
   topic:String,
    comments:[{body:{
        type:String
    }, name:{
        type:String
    },
    date:{type:Date}
}],
postId:{ type: Schema.Types.ObjectId, ref: 'Prog' },
slug: { type: String, slug: "topic"} ,

commentCounts:Number,
category: String,
clickCounts:Number,
viewCounts:Number


//}

});


const commentsDB = module.exports= mongoose.model('commentSchema', commentSchema);


module.exports.createComment = function(commentsdb, postid, callback){
    //var a= "5dc959243f03053ac0cff016";
    commentsDB.updateOne({postId:postid}, {$push:{comments:commentsdb}, $inc:{commentCounts:1}}, callback);

  //  commentsDB.updateOne({postId:postid}, {$push:{comments:commentsdb}, $inc:{commentCounts:1}}, callback);

   /* prog.createComment(postid, (err, prog)=>{

        if(err) throw err;
    });*/
   // pTest.update({_id:ObjectId(testId)}, {$inc:{commentCounts:1}});
   // pTest.find({_id:testId}, (err, test)=>{
     //   if(err)return console.log(err);

     /*   pTest.update({_id:testId}, {$inc: {commentCounts: 1}}, function (err, product) {
            if (err) {
             //   res.json({error: 1, message: err, data: []});
                console.log(err)
            } else {
               // res.json({error: 0, message: 'success', data: {commentCounts: product}});

                console.log(  product.toString() +"the product")         
            }
        });*/
     //   pTest.update({$inc:{commentCounts:1}})
      //  console.log(test + "the test");
  //  });


   /* test.find({}, (err, test)=>{
        if(err) return console.log(err);//{
          
          res.send(test);
            console.log(test.length +"here");
       // }
      });*/
   // prog.update({"_id":ObjectId(postid)}, { $inc:{commentCounts: 1 } });
  //  prog.findAndModify({_id:postid},{$inc:{commentCounts:1}});
   // commentsDB.updateOne({postId:postid}, {$push:{comments:commentdb}}, callback)
   // commentdb.save(callback);
 console.log(commentsdb + postid+"ok");
   // req.flash('success', 'comment added');
 /*  Prog.findOneAndUpdate({_id:postid}, {$inc: {commentCounts: 1}}, {new:true},
    
    function (err, product) {
    if (err) {
     //   res.json({error: 1, message: err, data: []});
        console.log(err)
    } else {
       // res.json({error: 0, message: 'success', data: {commentCounts: product}});
  //     socket.broadcast.emit('commentCount', product);
        console.log(  product )    
      //  console.log(callback);     
    }
});

socket.broadcast.emit('comment',product);
socket.broadcast.emit('commentCount', product);      */
}
/*
module.exports.addCount = function(getSub, callback){

    commentsDB.updateMany({category:getSub}, {$inc:{count:1}}, callback);
}*/