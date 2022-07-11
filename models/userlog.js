const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
//const bcrypt = require('bcryptjs');
const config = require('../config/databse');

//mongoose.connect(config.database, { useNewUrlParser: true, useUnifiedTopology: true });

//const db = mongoose.connection;

//user Schema
const userLogSchema = mongoose.Schema({
    // _id: Schema.Types.ObjectId,
   
    email: {
        type: String,
        required: true,
        trim: true
    },
    
    
    loginDate:
    {
        type: Date,
        trim: true
    },
    
    logoutdate: {
        type: Date,
        trim: true
    }

});

var userLog = module.exports = mongoose.model('userLog', userLogSchema);

module.exports.createUserLog = function(userLog, callback) {
   
            userLog.save(callback);
            console.log(callback)
      
    }