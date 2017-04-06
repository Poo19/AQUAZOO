var mongoose = require("mongoose");

// connect to the database

mongoose.connect("mongodb://localhost/aquazoo", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});



var Animal = require("./models/animal");
var Description = require ("./models/description");


Description.find ({commonname:'Green Sea Turtle'},function(err,output){
    if (err)
    {console.log(err);}
    else {
      
      console.log(output[0].toObject()._id);
              Animal.create({
            d_t     :   new Date,
            age     :   100,
            weight  :   1000,
            size    :   220,
            gender  :   "Male",
            location:   "BlockC",
            sid      :  output[0].toObject()._id, 
        },function (err,Animal) {
          if (err) {
              console.log(err); 
              } 
          else {
              console.log(Animal);
          }
        });
      
    }
});



// Animal.findById("581b823ed50672108b502011").populate("sid").exec(function (err,Animal){
//     if (err){   console.log(err)}
//     else {
//         console.log(Animal);
//     }
// });
