const express=require("express");
var app=express();
const mongoose=require("mongoose");
var path=require("path");
var bodyparser=require("body-parser");
mongoose.Promise=global.Promise;
const url='mongodb://127.0.0.1:27017/tester';
mongoose.connect(url,{connectTimeoutMS:1000},(err,result)=>{
    if(err){
        console.log("Error connecting to mongodb",+err);
    }
    else{
        console.log("Connection with database successful");
    }

});
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,"public")));
app.use(function(req,res,next){
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Method','GET,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Credentials',true);
    res.setHeader('Access-Control-Allow-Headers','Content-Type');
    next();
});
var routes=require("./routes/routers");
app.use("/",routes);

app.listen(4000);
console.log("Server is successfully listening at port 4000");
module.exports=app;