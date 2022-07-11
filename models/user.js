const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
const bcrypt = require('bcryptjs');
const config = require('../config/databse');

//mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

//const db = mongoose.connection;

//user Schema
const userSchema = mongoose.Schema({
     _id: Schema.Types.ObjectId,
    name: {
        type: String,
        required: true,
       
        trim: true
    },
    role: {
        type: String,
     
        trim: true
    },
   
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        trim: true
    },
    status:{type: Boolean,
        default: false},
    loginDate:
    {
        type: Date,
        trim: true
    },
    loginStatus:{
        type:String,
        trim:true
    },
    
    logoutdate: {
        type: Date,
        trim: true
    }

});
var User = module.exports = mongoose.model('User', userSchema);

module.exports.createUser = function(newUser, callback) {
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(newUser.password, salt, function(err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername= function(email, callback) {
    const query = { email: email };
    User.findOne(query, callback);
}

module.exports.getUserById = function(id, callback) {
    User.findById(id, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback) {
        bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
            if (err) throw err;
            callback(null, isMatch);
        });
    }
    //}

/*module.exports.update= function(role, approve, email, callback){
    User.updateOne({email:email},{$set:{roles:role, role:role, status:approve}},callback);
    console.log("inhere" +email);
    console.group(callback);*/
//}