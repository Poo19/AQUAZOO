var mongoose = require("mongoose");

// connect to the database

mongoose.connect("mongodb://localhost/aquazoo", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

var SponsorshipSchema = new mongoose.Schema ({
                           AID : {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: "Animal",
                                    unique: true },
                           startdate: { type: Date, default: Date.now ,expires: 10},
                           lastdate:  { type: Date, default: Date.now },
                           amount: {type: Number, min:1, max: 1000} 
                        
                  
});

// MODELLING THE Sponsorship SCHEMAS
module.exports     =   mongoose.model("Sponsorship", SponsorshipSchema);