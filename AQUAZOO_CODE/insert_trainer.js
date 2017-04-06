var mongoose = require("mongoose");

// connect to the database

mongoose.connect("mongodb://localhost/aquazoo", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

var Animal = require("./models/animal");
var Trainer = require ("./models/trainer");

Animal.findById ("581d6e17b059e365db61ca55",function(err,output){
    if (err)
    {console.log(err);}
    else {
      
      // console.log(output.toObject()._id);
    Trainer.create({
           
            Lname : "Adam",
            Fname : "Aadil",
            image :  "https://scontent-atl3-1.xx.fbcdn.net/v/t1.0-9/1534326_780597615286251_115427429720452418_n.jpg?oh=d0d527100ceec6b50dddabd77d37b4ee&oe=5889FE37",
             salary:  1000,
             AID    :  output.toObject()._id, 
        },function (err,Trainer) {
          if (err) {
              console.log(err); 
              } 
          else {
              console.log(Trainer);
          }
        });
      
    }
});