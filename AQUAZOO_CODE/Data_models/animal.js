var mongoose = require("mongoose");

// connect to the database

mongoose.connect("mongodb://localhost/aquazoo", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

//DEFINING THE  ANIMAL SCHEMA

var AnimalSchema  = new mongoose.Schema ({ 
    d_t     :   { type: Date, default: Date.now },
    age     :   { type: Number, min: 1, max: 200 },
    weight  :   { type: Number, min: 1, max: 1000 },
    size    :   { type: Number, min: 10, max: 1000 },
    gender  :   {type: String, enum: ["Male", "Female"]},
    location:   String,
    sid     :   {
                 type: mongoose.Schema.Types.ObjectId,
                 ref: "Description"
                }
});

// MODELLING THE ANIMAL SCHEMAS
module.exports     =   mongoose.model("Animal", AnimalSchema);

