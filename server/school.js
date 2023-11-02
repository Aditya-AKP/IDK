const mongoose=require("mongoose");

const schoolschema=new mongoose.Schema({
    SchoolID:Number,
    SchoolName:String,
    State:String,
    District:String,
    Block:String,
    password:Number},
    {
        collection:'school',
        versionKey: false
});


module.exports=mongoose.model("school",schoolschema);