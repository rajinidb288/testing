const{ Blog,Userdb }=require('../model/user');

//create and save new user
const  credential = {
    email : "admin@gmail.com",
    password : "admin123"
}


    

exports.login=(req,res)=>{
console.log(req.body.email);
    if(req.body.email == credential.email && req.body.password == credential.password){
        console.log('req.body.email')
        req.session.user = req.body.email;
        res.redirect('../view/dashboard');
        //res.end("Login Successful...!");
    }else{
        res.end("Invalid Username")
    }

}
exports.logout=(req,res)=>{
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }else{
            res.render('base', { title: "Express", logout : "logout Successfully...!"})
        }
    })
}

exports.updates=(req,res)=>{
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
    status:req.file.filename,
    })
    update.exec(function(err,data){
      res.redirect('/');
  });
  }
exports.create=(req,res)=>{
    //validate request
   // console.log(req.file);
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
  image:req.body.file,
  
 
 })
//  if(req.file){
//     user.avatar=req.file.path
//  }

 //save user in the database

 user
  .save(user)
  .then(data=>{
     //res.send(data)

     res.redirect('/add-user')

 })
 .catch(err=>{
     res.status(500).send({
         message:err.message|| 'some error occured'
     });

 });
}

//retrive and return all users

exports.find=(req,res)=>{
    if(req.query.id){
        const id=req.query.id;
        Userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message:"not found"})
            }
            else{
            res.send(user)
            }
        })
       .catch(err=>{
           res.status(500).send({message:err.message|| "error occur"})
       })
    }else{
        Userdb.find()
        .then(user=>{
            res.send(user)
        })
       .catch(err=>{
           res.status(500).send({message:err.message|| "error occur"})
       })
    }
   
}

//update

exports.update=(req,res)=>{
    if(!req.body){
       return res
       .status(400).send({message:"content can not be empty"});
        return;
    }
const id=req.params.id;
Userdb.findOneAndUpdate(id,req.body,{useFindAndModify:false})
.then(data=>{
    if(!data){
        res.status(404).send({message:'coonot update'})
    }
    else{
        res.send(data)
    }
})
.catch(err=>{
    res.status(500).send({message:'error update user'})
})
}

//delete
exports.delete=(req,res)=>{
    const id=req.params.id;
    Userdb.findOneAndDelete(id)
    .then(data=>{
        if(!data){
            res.status(404).send({message:'cannot delete'})
        }else{
            res.send({
                message:"deleted"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"not delete"
        });
    });
}