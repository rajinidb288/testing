const axios=require('axios');
const{ Blog,Userdb }=require('../model/user');
exports.homeRoutes=(req,res)=> {
     
    req.session.name="rajini";
    axios.get('http://localhost:3000/api/users')
    .then(function(response)
    {
        //console.log(response)
        res.render('index',{users:response.data});
    })
    .catch(err=>{
        res.send(err)
    })
}

exports.dashboard = (req, res) =>{
    res.render('dashboard');
}

exports.uploadphoto = (req, res) =>{
    res.render('image_upload');
}

exports.add_user = (req, res) =>{
    res.render('add_user');
}

exports.user_login = (req, res) =>{
    res.render('base');
}

exports.session_set = (req, res) =>{
      var name=req.session.name;
     return res.send(name)
     }

exports.update_user=(req,res)=> {
    const id=req.params.id;
   const edit= Userdb.findById(id);
   edit.exec(function(err,data){
       res.render('update_user',{title:'edit employee recors',records:data})
   });

}
