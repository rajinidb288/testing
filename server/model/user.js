const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
  

    //img:{data:Buffer,contentType: String}
   
        gender: String,
        status: String,
        image: String,

     
    
});
const blogSchema = new mongoose.Schema({
 
    img: {
      type: String,
      default: 'placeholder.jpg',
    }

   
  });


// Creating model objects
 const Blog = mongoose.model('blog', blogSchema);
const Userdb = mongoose.model('userdb', schema);
// Exporting our model objects
module.exports = {Userdb,Blog}
