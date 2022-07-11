

const mongoose = require('mongoose');

const Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

const reporterSchema = mongoose.Schema({
 _id: Schema.Types.ObjectId,
name: 
{
   type: String,
   required: true,
    trim:true
   },
surname:{
   type: String,
   required:true,
   trim:true
},
facebook: 
{
   type: String,
   required: true,
    trim:true
   },
instagram:{
   type: String,
   required:true,
   trim:true
},
profile: 
{
   type: String,
   required: true,
    trim:true
   },
twitter:{
   type: String,
   required:true,
   trim:true
},
phone: 
{
   type: String,
   required: true,
    trim:true
   },
email:{
   type: String,
   required:true,
   trim:true
},
date: 
{
   type: Date,
   required: true,
    trim:true
   }

});

const reporter = module.exports = mongoose.model('reporterSchema', reporterSchema);

module.exports.createPost= function(newReporter, callback){
   newReporter.save(callback);
   console.log(newReporter);
}