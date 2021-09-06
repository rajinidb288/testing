const express=require('express');
const morgan=require('morgan');
const bodyparser=require('body-parser');
const path= require('path');
const fs = require('fs');
const multer = require('multer');
const dotenv=require('dotenv');
const session =require("express-session")
mongoose = require("mongoose");
const connectDB=require('./server/database/connection');

dotenv.config({path:'config.env'})
const PORT =process.env.PORT||8080



const app = express();

app.use(session({
    secret:"your secret key",
    resave:true,
    saveUninitialized:true

}));

// app.get("/",(req,res)=>{
//     req.session.name="rajini";
//    // return res.send("session start")s
// })

// app.get("/session",(req,res)=>{
//     var name=req.session.name;
//   //  return res.send(name)
// })
app.use(morgan('tiny'));
//mongo db connection
connectDB();

app.use(bodyparser.urlencoded({extended:true}))
// load view
//app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
//app.set('views', path.resolve(__dirname, '/views/'));
//load assest
// app.use('/css',express.static(__dirname + 'assets/css'));
// app.set('/css',express.static(path.resolve(__dirname, "/assets")))
// app.set('/img',express.static(path.resolve(__dirname, "assets/css")))
// app.set('/js',express.static(path.resolve(__dirname, "assets/js")))
//css/style.css
app.use(express.static(__dirname + '/assets'));

app.use(express.static(__dirname + '/assets/img'));
// SET STORAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'assest/img')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
  var upload = multer({ storage: storage })

app.use('/',require('./server/routes/router'));

app.listen(3000, () => {
    console.log('Express server started at port 3000');
});