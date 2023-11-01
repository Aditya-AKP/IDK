const express=require("express");
const app=express();
const path=require("path")


app.use(express.static(path.resolve('./public')));
//app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");


app.get("/l",(req,res)=>{
    res.send("index.html");
});

app.listen(process.env.PORT || 3000);