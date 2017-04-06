var mongoose = require("mongoose");

// connect to the database

mongoose.connect("mongodb://localhost/aquazoo", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

var TrainerSchema = new mongoose.Schema ({
    
                           Lname : { type: String,
                                     unique: true 
                                    },
                           Fname :  String,
                           image :  String,
                           
                           salary:  { type: Number, min: 1 },
                           AID : {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: "Animal",
                                 }
                  
});

// MODELLING THE Sponsorship SCHEMAS
module.exports     =   mongoose.model("Trainer", TrainerSchema);