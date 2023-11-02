const express=require("express");
const path=require("path")

const school=require("./server/school");
require("./server/config");
const app=express();

const publicPath=path.join(__dirname,'public');


app.use(express.static(__dirname));
app.use(express.json());
app.set("view engine", "ejs");

app.get("/",(req,res)=>{
    res.render(__dirname+'/index');
})

app.get("/viewstudentdetails",async(req,res)=>{
    const schol = await school.find({});
  res.render(__dirname+"/public/ViewStudentDetails", {
    schol: schol,
  });
});

app.post("/schoollogin",async(req,res)=>{
    console.log("Enter");
    let schools=new school({
        "SchoolID":21,
        "SchoolName":"String",
        "State":"String",
        "District":"String",
        "Block":"String",
        "password":123
    });
    let result=await schools.save();
    console.log("Middle");
    res.render(__dirname+'/public/SchoolPortal');
    console.log("Exit");
});

app.get("*",(req,res)=>{
  res.render(__dirname+"/public/Error404");
})

app.listen(3000);