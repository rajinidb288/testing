const express=require('express');
const route = express.Router();
const multer=require('multer');


const{ Blog,Userdb }=require('../model/user');
const services=require('../services/render');
//const upload=require('../../middleware/upload');
const user1=require('../controller/user');

route.get('/uploadphoto',services.uploadphoto);
route.get('/',services.homeRoutes);
route.get('/view/dashboard',services.dashboard);
route.get('/add-user',services.add_user);
route.get('/user-login',services.user_login);

route.get('/session',services.session_set);

//route.post('/update',user1.updates);
route.get('/update-user/:id',services.update_user);
//api
//route.post('/api/users',user1.create);

route.get('/route/logout',user1.logout);


route.post('/route/login',user1.login);
route.get('/api/users',user1.find);
route.put('/api/users/:id',user1.update);
route.delete('/api/users/:id',user1.delete);

// var storage = multer.diskStorage({
//     destination: function(req, file, callback) {
//         callback(null, "./assets/img/");
//     },
//     filename: function(req, file, callback) {
//         callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
//     }
// });
//   var upload = multer({
//     storage: storage
// }).array("imgUploader", 3);



// route.post("/uploadphotos", (req,res)=>{
//     upload.single('imgUploader')(req, res, function (err) {
//     var img=fs.readFileSync(req,file.path);
//     var encode_image=img.toString('base64');
//     var finalImg={
//         contentType:req.file.mimetype,
//         path:req.file.path,
//         image:new Buffer(encode_image,'base64')
//     };

//     db.collection('image').insertOne(finalImg,(err,result)=>{
//         console.log(result);
//         if(err)return console.log(err);
//         console.log("saved");
//         res.contentType(finalImg,contentType)
//         res.send(finalImg.image)
//     })
//     })
//          })


// route.post("/uploadphotos",upload.single("imgUploader") ,function(req,res){
// if(req.file===undefined) 
// return res.send("select file");
// const imgUrl='http://localhost:3000/uploadphotos/${req.file.filename}';
// return res.send(imgUrl);


// })


var storage =   multer.diskStorage({
destination: function (req, file, callback) {
    callback(null, './assets/img/');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
  }
});
var upload = multer({ storage : storage}).single('file');

route.post('/api/users',upload,function(req,res){
  if (req.session.user){
    console.log(req.session.user);
  if(!req.body){
      res.status(400).send({message:"content can not be empty"});
      return;
  }
// //new user

const user=new Userdb({
name:req.body.name,
email:req.body.email,
gender:req.body.gender,
status:req.body.status,
image:req.file.filename,


})
//  if(req.file){
//     user.avatar=req.file.path
//  }

//save user in the database

user
.save(user)
.then(data=>{
  // res.send(data)

   res.redirect('/')

})
.catch(err=>{
   res.status(500).send({
       message:err.message|| 'some error occured'
   });

});
  }
  else{
    res.redirect('user-login')
  }
});

route.post('/updates',upload,function(req,res){
  if(!req.body){
     return res
     .status(400).send({message:"content can not be empty"});
      return;
  }
const id=req.params.id;
const update=Userdb.findOneAndUpdate(req.body.id,{ name:req.body.name,
  email:req.body.email,
  gender:req.body.gender,
  status:req.body.status,
  image:req.file.filename,
  })
  update.exec(function(err,data){
    res.redirect('/');
});
});

route.post('/uploadphotos',function(req,res){
    upload(req,res,function(err) {
        console.log(req.file);
  // console.log(request.body);
  let blog = new Blog({
    
    img: req.file.filename
  });

  blog
  .save(blog)
  .then(data=>{
     res.send(data)

     res.redirect('/')

 })
 .catch(err=>{
     res.status(500).send({
         message:err.message|| 'some error occured'
     });

 });
    });
});

route.post('/single', (req, res) => {
  console.log(req.file.filename)
  try {
    res.send(req.file);
  }catch(err) {
    res.send(400);
  }
});
module.exports=route;