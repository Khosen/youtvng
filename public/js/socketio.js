

var socket = io("https://youtvng.com");
//var socket = io("http://localhost:3000");

var event = new Date(); 
//var idget = $('.getClick').val();
$('#commentForm').on('submit', function onSubmit() {
  // raw comments data being prepared for db
  var postId = $('#postId').val();
  var comment = $('#comment').val();
  var name =$('#name').val();
  var postslug =$('#postslug').val();
 // var testId =$('#testId').val();

  //socket.on('#send').click(
  //  function(){
   //comments counter//
//var count =$('#counts').val();
//  socket.emit('commented');//emitting user click
    //console.log("button clicked");
var time = event.toLocaleTimeString('it-IT');
 var date = new Date().toLocaleDateString();
   var data ={'postId':postId, 'postslug':postslug,'comment': comment, 'name':name};
   var postdata ={'postId':postId};
//the comments are displayed live while being sent to db
  $('.comments').append("<span>"+  $('#name').val() +     "&nbsp;"   +    "&nbsp;"   +"</span>");
  $('.comments').append("<span>"+  date +     "&nbsp;"    +      "&nbsp;"   +"</span>");
  $('.comments').append("<span>"+  time +"</span>");
 //$('.comments').append("<p>" + $('#name').val()+ "</p>");
 $('.comments').append("<p>" + $('#comment').val()+ "</p>");
    
 //$('.counter').append("<span>" + getCount+ "</span" );
   $('#comment').val('');
   $('#name').val('');
       
 socket.emit('comment',data);
 socket.emit('commented', data);//emitting user click
 
 
  return false;
 
 });

 //all previous comments are displayed
 socket.on('comment',function(data){
  var postId = "<%= postId %>";
  if(postId==data.postId){
   // $('.comments').append("<p>"+ "<label>"+data.name+"</label"+"</p>");
      $('.comments').append("<p>"+data.comment+"</p>");
   // $('#counts').html("<span>" + data.commentCounts + "</span>"); //set new count value
  
     // $('#counts').append( data.length+1 );
      console.log(data.length);
       console.log(data.noComment + "here") ;
    // $('.counter').append("<p>"+count+ 1+"</p>");
 
  }
  });
//get count from serer
 /* socket.on('commentCount', function(result){
   ////display on page
  // var a = result ; //+ parseInt(1);
    $('#counts').append("<span>" + parseInt(result) + "</span>"); //set new count value
    console.log("ready to count" +result);

  }); */



  $(function(){
   // var socket=io("http://localhost:3000"); //connect to socket
    socket.on('connect', function()
    {
      console.log("ready to count");

      //get count from serer
  socket.on('commentCount', function(product){
    ////display on page
   
  var  counts = product.commentCounts;
     $('#counts').html("<span>" + counts+ "</span>"); //set new count value
   //  console.log("ready to count" +result);
    console.log(product.commentCounts + "the counts");
   }); 
 

    });



  });

  //writing the click function
  //blog likes where u got the commenting section
  //like clicked info passed to socket server which then upates database
  $('#clicks').on('click', function   onClick(){
    //get postid for comparism
    var postId = $('#clickvalue').val();
    
    //get clicks from hidden field that has updated clicks
   console.log("mouse clicked" +postId);
  
    socket.emit('clicked', postId);
  });
///index page likes
  $('.clickcount').on('click',  function onClick(){
    
   var getId = $(this).attr("data-id");
   
    console.log("button clicked" + getId);
    socket.emit('clicked', getId);

  });
  /*$('.sum').click(function() {
    var count = $(this).siblings("p").find("a").text().split('/');*/
  
 /* $('.clickme').on('click', function () {
    var count = parseInt($(this).data('click')) || 0;
    count=count+1;
    $(this).data('click',count);
    alert(count);    
  });*/
  /*$('#click1').on('click', function   onClick(){
    //get postid for comparism
    var postId = $('#clickvalue').val();
    
    //get clicks from hidden field that has updated clicks
   console.log("mouse clicked" +postId);
   // var clicks =$('#clickvalue').val();
  //  console.log(clicks + "the value");
    //send click value to server
    socket.emit('clicked', postId);
  });

  $('.clicks1').on('click',function   onClick(){
  // $(function(onClick()){
    //get postid for comparism
  //  var postId = "<%= postId %>";
  var postId = $('#clickvalue').val();
  //  var postId = document.getElementsByClassName('.clickvalue');
    //get clicks from hidden field that has updated clicks
   // var postId =$(this).val();
   console.log("mouse clicked" +postId);
   // var clicks =$('#clickvalue').val();
  //  console.log(clicks + "the value");
    //send click value to server
    socket.emit('clicked', postId);
  });*/
//fblog likes
  socket.on('showClick', function(result){

  //  var w= parseInt(result) +1
//recieve click value from server and display

var clicks= result.clickCounts;
    $('#clicks').html("<span>" +" " + clicks + "</span>");
  
// console.log(result._id);
  });
//indexpage likes
  socket.on('showClick', function(result){
  
  var clicks= result.clickCounts;
  var postid = result._id;
  
 $("span#clickval_"+postid).html(clicks);
 
 //  console.log($("span#clickval_"+postid).html(clicks));
 
  // console.log(result._id );
   
    });

    
   // }
  