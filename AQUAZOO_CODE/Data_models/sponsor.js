var mongoose = require("mongoose");

// connect to the database

mongoose.connect("mongodb://localhost/aquazoo", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});


// DEFINING THE SPONSOR SCHEMA
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var SponsorSchema = new mongoose.Schema ({
    name: String,
    image: String,
    // Refered : code from "http://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax"
    email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
            },
            
    Sponserships : [ 
                          {   type: mongoose.Schema.Types.ObjectId,
                              ref: "Sponsorship",
                              unique: true
                          }
                  ]
});
    

   
module.exports  =   mongoose.model("Sponsor", SponsorSchema);
