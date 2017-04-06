var mongoose = require("mongoose");

// connect to the database

mongoose.connect("mongodb://localhost/aquazoo", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

// DEFINING THE  DESCRIPTION  SCHEMA
var DescriptionSchema = new mongoose.Schema ({
  
    image               : String,
    commonname          : {type:String, unique: true, index: true },
    scientific_name     : {type:String, unique: true, index: true },
    type                : {type:String, index: true },
    
    average_lifespan    : Number,
    avg_weight          : Number,
    avg_size            : Number,
    
    habitat             : String,
    continent           : String,
    classification      : String,

    status_of_conservation : String,
    text                   : String
   
});

 // MODELLLING THE DESCRIPTIONS
module.exports     =   mongoose.model("Description", DescriptionSchema);
   
