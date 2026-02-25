const mongoose=require('mongoose');
const courseSchema=mongoose.Schema({
    name:{
        type:String,
        required:true},
        duration: String,
        fees: Number
});
module.exports=mongoose.model('Course',courseSchema);
