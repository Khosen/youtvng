const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userLog = require('../models/userlog');
//load user model
const User = require('../models/user');


//login in to the console
//async.parallel({
 module.exports=function(passport){
    // async.parallel({

    passport.use(
        new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
            //match user
         // User.findOne({email:email})
         User.findOneAndUpdate({email:email}, {loginDate:Date.now(), loginStatus:'online'})
         
          .then(user=>{
              
              if(!user){
                  return done(null, false, {message:'Email not registered'});
              }
              //match password
              bcrypt.compare(password, user.password, (err, isMatch)=>{
                  if(err) throw err;
                  if(isMatch){
                      
                      return done(null, user);

                    
                      
                  }else{
                      return done(null, false, {message:'Password incorrect'});
                  }
                  
              });
              
           

              //console.log(userLog)
          })
          .catch(err => console.log(err));
         
        })
       
    ); 
    passport.serializeUser((user, done)=> {
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done) =>{
        User.getUserById(id, (err, user)=> {
            done(err, user);
        });
    }); 


//})
}


/*module.exports=function(passport){
    passport.use(new LocalStrategy(
    function(email, password, done) {

        User.getUserByUsername(email, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Email not registered' });

            }
            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    return done(null, user);

                } else {
                    return done(null, false, { message: 'Invalid Password' });
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});
} */
