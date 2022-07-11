
const commentsdb = require('./models/comments');
const Prog = require('./models/programmes');


module.exports=function(io){

 //var count=15;
    io.on("connection", (socket) => {  
        console.log("a user connected");
        //const hasChanged = await haveExamsChanged();
        //(hasChanged) {
        // var count=15;
     //socket.emit('commentCount', count);
         // console.log("another user " +count);

          var postid; var getSlug;
          socket.on('comment',function(data){
            console.log("connected" +data.postId+data.name+data.comment);
            const docs={name:data.name,
              body:data.comment,
            date:new Date(Date.now())};
            postid=data.postId;
            getSlug = data.slug;
              //testId=data.testId;

              commentsdb.createComment(docs, postid, getSlug, (err, commentsdb)=>{
                if(err) return console.log(err) //{
                 // console.log(err);
               // }else{

           /*  Prog.addCount(postid, (err, Prog)=>{
                    if(err){
                      console.log(err);
                    }
                    console.log(Prog +"this is printing");
         
                  });*/
                
                
          socket.broadcast.emit('comment',data); 
          // socket.broadcast.emit('commentCount', data);
        //   console.log("in here" + data);
       
              // }
              });
             // var count=2;
       /* socket.on('commented', function(){

          //ad to database
         // count += 1;
          console.log("another user2 connected");
      
          socket.emit('commentCount', data);
          console.log("count");
        });*/

            //var commentData = new commentsdb(docs);
            //commentData.save();
           /* commentsdb.createComment(docs, postid, (err, commentdb)=>{
              if(err) {
                console.log(err);
              }else{
         socket.broadcast.emit('comment',data); 
         console.log("in here" + commentdb);
     
         console.log(data +"this is printing");
            }
            });*/

          });
      // var count=2;
    /*  Prog.find({_id:postid}, (err, data)=>{
        if(err){
          console.log(err);
        }
        else{
          socket.on('commented', function(){
            socket.emit('commentCount', data);
          });
        }
      });*/
        socket.on('commented', function(data){

       //   console.log(data + "the ransmit");
        // socket.emit('commentCount', data)
       /* Prog.find({_id:postid}, (err, data)=>{
          if(err){
            console.log(err);
          }
          else{
       //     socket.on('commented', function(){
         console.log(data);
              socket.emit('commentCount', data);
           // });
          }
        });*/
        /* Prog.addCount(postid, (err, result)=>{
           if(err){
            console.log(err);
           }
           else{
             console.log(result +"here right");
            // console.log(callback)
              socket.emit('commentCount', result);

              console.log(result +"this if for find")
           }
          });*/

          var postID = data.postId;
          Prog.findOneAndUpdate({_id:postID}, {$inc: {commentCounts: 1}}, {new:true},
    
            function (err, product) {
            if (err) {
             //   res.json({error: 1, message: err, data: []});
                console.log(err)
            } else {
               // res.json({error: 0, message: 'success', data: {commentCounts: product}});
          //     socket.broadcast.emit('commentCount', product);
                console.log(  product )    
              // console.log(data);     
            }
         //   socket.broadcast.emit('comment',product);
           socket.emit('commentCount', product);      
           
        });
       
       // socket.emit('commentCount', product);      
          
          console.log("another user2 connected");
      
        //  socket.emit('commentCount', data);
          console.log("count");
       });

        //gets info from socket client and goes to db to inc likecount
        socket.on('clicked', function(postId){


          //var noClicks = clicks.
          Prog.findOneAndUpdate({_id:postId}, {$inc: {clickCounts: 1}}, {new:true},
    
            function (err, clicks) {
            if (err) {
             //   res.json({error: 1, message: err, data: []});
                console.log(err)
            } else {
               // res.json({error: 0, message: 'success', data: {commentCounts: product}});
          //     socket.broadcast.emit('commentCount', product);
                console.log( clicks)    
              // console.log(data);     
            }
         
          //recieve clicks value from client
         // console.log(clicks);
        // var recievedClicks=0;
        // recievedClicks = parseInt(clicks) +1;
       //  recievedClicks +=1;
         ///update database click count with new data 

         //send back to client updatd data
          socket.emit('showClick', clicks);


      });
      
        
  
      });
      

    
});
}
