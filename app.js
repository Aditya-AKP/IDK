const express = require("express");
const path = require("path")
const bodyParser = require("body-parser");
const sessions = require('express-session');

const school = require("./server/school");
const student=require("./server/student");
const aadhar=require("./server/aadhar");
require("./server/config");
const app = express();

const publicPath = path.join(__dirname, 'public');


//Use App
app.use(
  sessions({
    secret: 'some secret',
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
    resave: true,
    saveUninitialized: false,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname));
app.use(express.json());
app.set("view engine", "ejs");



//GET METHODS
app.get("/", (req, res) => {
  req.session.destroy();
  res.render(__dirname + '/index');
})

app.get("/viewstudentdetails", async (req, res) => {
    const schol = await school.find({});
    res.render(__dirname + "/public/ViewStudentDetails", {
      schol: schol,
    });
});

app.get("/StudentRegistration", (req,res)=>{
  res.render(__dirname + '/public/Registration');
});

//POST METHODS
app.post("/schoollogin", async (req, res) => {
  console.log(req.body);
  const temp=await school.findOne(req.body);
  if(temp!=null){
  req.session.userid = req.body.SchoolID;
  res.render(__dirname + '/public/SchoolPortal');
  }else{
    res.render(__dirname + "/public/WrongUserPass");
  }
});

app.get("*", (req, res) => {
  res.render(__dirname + "/public/Error404");
})

app.listen(3000);