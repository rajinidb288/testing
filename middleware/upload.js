const multer=require('multer');
const path= require('path');

var storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, "./assets/img/");
    },
    filename: function(req, file, callback) {
        let ext=path.extname(file.originalname)
        callback(null,Date.now() + ext)
    }
});

  var upload = multer({
    storage: storage,
    fileFilter:function(req,file,callback){
        if(
            file.mimetype=="image/png" || file.mimetype=="image/jpg"
        ){
            callback(null,false)
        }else{
            console.log('only jpg')
            callback(null,false)
        }
    },
    limits:{
        fileSize:1024*1024*2
    }
})