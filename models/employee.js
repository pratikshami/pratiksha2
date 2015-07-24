var mongoose=require('mongoose');
var Schema=mongoose.Schema;
 
var empSchema = new Schema({
  name : String,
  salary : Number,
  department: String,
 
});
 
module.exports = mongoose.model('employees', empSchema);