const express = require('express');
//const {check, validationResult} = require('express-validator');

const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const User = require('../models/user');
const { render } = require('ejs');
const {ensureAuthenticated} = require('../config/auth')


//register admin

router.get('/admin', (req, res) => {
    
   res.render('admin');
});



router.post('/admin', (req, res)=>{
    //register handle
    const {name, email, password, password2} = req.body;
    let errors =[];

    //check required fields
    if(!name || !email ||!password || !password2){
        errors.push({message: 'Please fill in all fields'});
    }
    //check password match
    if(password !== password2){
        errors.push({message: 'passwords do not match'})
    }
    
    //check password length
    if(password.length < 6){
        errors.push({message: 'Password should be atleast 6 chracters'})
    }

    if (errors.length > 0){
        res.render('registerConsole', {errors,
        name, email, password, password2});
    }else {
        //validation
        User.findOne({email:email})
        .then(user=>{
            if(user){
                //user exists
                errors.push({message:'Email is already registered'});
                res.render('registerConsole', {errors,
                    name, email, password, password2});
            }
            else{
               // var userName = req.body.username;
               var date = Date.now();
                var role = "Admin";
            var newUser = new User({

            name: req.body.name,
            role:role,
            email: req.body.email,
            password: req.body.password,
            date: date
                  
        });

        User.createUser(newUser, function(err, user) {
            if (err) throw err;
            //  req.flash('success_msg', 'Data has created successfully!');

            console.log(user);
        });

            }
        
        });
        
    }
    
   // errors.push({message: 'Data has been created successfully'})
    console.log(req.body);
    req.flash('success_msg', 'You are now registered and can login!');

    res.redirect('/users/adminConsole');
   // res.redirect('/admin/confirmPage');

   // res.send('hello');
});




//register users. check if db is empty to open admin registration
//before user registration
router.get('/registerConsole', (req, res) => {
    User.findOne({role:"Admin"})
    .then(user=>{
        if(user){
            //user exists
            
            res.render('registerConsole')
        }
        else{
            res.render('admin');
        }
     });
   
});

//valuate data to regiser user

    router.post('/registerConsole', (req, res)=>{
        //register handle
        const {name, email, password, password2} = req.body;
        let errors =[];

        //check required fields
        if(!name || !email ||!password || !password2){
            errors.push({message: 'Please fill in all fields'});
        }
        //check password match
        if(password !== password2){
            errors.push({message: 'passwords do not match'})
        }
        
        //check password length
        if(password.length < 6){
            errors.push({message: 'Password should be atleast 6 chracters'})
        }

        if (errors.length > 0){
            res.render('registerConsole', {errors,
            name, email, password, password2});
        }else {
            //validation
            User.findOne({email:email})
            .then(user=>{
                if(user){
                    //user exists
                    errors.push({message:'Email is already registered'});
                    res.render('registerConsole', {errors,
                        name, email, password, password2});
                }
                else{
                   // var userName = req.body.username;
                   var date = Date.now();
                    var status= false;
                   // var role= "pending";
                var newUser = new User({

                name: req.body.name,
                 //role: role,
                status:status,
                email: req.body.email,
                password: req.body.password,
                date: date
            
            });

            User.createUser(newUser, function(err, user) {
                if (err) throw err;
                //  req.flash('success_msg', 'Data has created successfully!');

                console.log(user);
            });

                }
            
            });
            
        }
        
       // errors.push({message: 'Data has been created successfully'})
        console.log(req.body);
        req.flash('success_msg', 'Please wait for approval before you can log in!');

        //res.redirect('/users/adminConsole');
       res.redirect('/admin/confirmPage');
    
       // res.send('hello');
    });


    //passport
    
//login

router.get('/adminConsole', (req, res) => {
    // req.flash('message');
    res.render('adminConsole', {
        message: req.flash('error')
    });
});

//login post

router.post('/adminConsole', passport.authenticate('local', {
    successRedirect: '/admin/dashboard',
    failureRedirect: '/users/adminConsole',
    failureFlash: true
}),
(req, res) => {

   //console.log(req.body.email);
   
   res.redirect('/admin/dashboard');
});


module.exports =router;