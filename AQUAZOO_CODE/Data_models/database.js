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
    commonname          : {type:String,unique: true},
    scientific_name     : {type:String,unique: true},
    continent           : String,
    habitat             : String,
    classification      : String,
    average_lifespan    : Number,
    status_of_conservation:String,
    type                : String,
    avg_weight          : Number,
    avg_size            : Number
});

 // MODELLLING THE DESCRIPTIONS
var Description     =   mongoose.model('Description', DescriptionSchema);
   
// //  INSERTING THE VALUES

//   Description.create(
//      {
//       commonname:"Dromedary",
//       image:" http://zoomadrid.com/sites/default/files/styles/fichaslide_breakpoints_theme_zoo2015_desktop_1x/public/sliders/dromedario1.jpg?itok=sZc8YPZ_",
//       scientific_name: "Camelus dromedarius ",
//       average_lifespan: "10",
//       avg_weight: "726",
//       avg_size: "160",
//       habitat:"herbivore",
//       status_of_conservation: "non-extint",
//       classification:"vertibrate",
//       type:"mammals",
//       continent: "Africa Deserts",
//   });
  
  
  
//   //DEFINING THE  ANIMAL SCHEMA

var AnimalSchema  = new mongoose.Schema ({ 
    d_t     :   { type: Date, default: Date.now },
    age     :   Number,
    weight  :   Number,
    size    :   Number,
    gender  :    {type: String, enum: ["Male", "Female"]},
    location:   String,
    sid     :   {
                  type: mongoose.Schema.Types.ObjectId,
                  ref: "Description"
                }
});

 // MODELLING THE ANIMAL SCHEMAS
var Animal          =   mongoose.model('Animal', AnimalSchema);

// Description.find ({commonname: 'Dromedary'},function(err,output){
//     if (err)
//     {console.log(err);}
//     else {
      
//       console.log(output[0].toObject()._id);
//               Animal.create({
//             d_t     :   new Date,
//             age     :   10,
//             weight  :   100,
//             size    :   220,
//             gender  :   "Male",
//             location:   "BlockA",
//             sid      : 
            
//             output[0].toObject()._id, 
//         },function (err,Animal) {
//           if (err) {
//               console.log(err); 
//               } 
//           else {
//               console.log(Animal);
//           }
//         });
      
//     }
// });

// DEFINING THE SPONSOR SCHEMA
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var SponsorSchema = new mongoose.Schema ({
    name: String,
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
            
    Sponsership : [ 
                        {   AID : {
                                    type: mongoose.Schema.Types.ObjectId,
                                    ref: "Animal",
                                    unique: true },
                            startdate: { type: Date, default: Date.now },
                            period:  { type: Date, default: Date.now },
                        }
                  ]
});
    

   
var Sponsor         =   mongoose.model('Sponsor', SponsorSchema);

//sponsor_ship value insertion

Animal.findById("5814f478a94babb9314a69af",function(err,output1){
if (err)
 { console.log(err);}
     else {     console.log(output1.toObject()._id)
                Sponsor.create({
                name: "Poornima",
                // Refered : code from "http://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax"
                email: "pg0018@uah.edu",
                        
                Sponsership : [
                                 {  AID : output1.toObject()._id,
                                    startdate: new Date(2016, 11, 17),
                                    period: new Date(2017, 11, 17),
                                }
                              ]
            },function (err,Sponsor) {
              if (err) {
                  console.log("sponsor error"); 
                  console.log("sponsor err"); 
                  } 
              else {
                  console.log(Sponsor);
              }
            });

    }
});






