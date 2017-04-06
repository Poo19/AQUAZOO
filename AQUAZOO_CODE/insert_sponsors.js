var mongoose = require("mongoose");

// connect to the database

mongoose.connect("mongodb://localhost/aquazoo", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});

var Animal = require("./models/animal");
var Description = require ("./models/description");
var Sponsorship = require ("./models/sponsorship");
var Sponsor = require ("./models/sponsor");



Animal.findById("581d5ce65622e5627959ed5b",function(err,Animal){
    if (err) {
        console.log(err);
    }
    else {
        // Create the sponsor
          Sponsorship.create ({
            AID : Animal.toObject()._id,
            startdate: new Date(2016, 11, 17),
            lastdate: new Date(2017, 11, 17),
            amount: 100
          }, function(err,Sponsorship){
              if (err)
              {
                  console.log(err);
              }
              else {
                     //console.log(Sponsorship);
                     console.log( Sponsorship.toObject()._id);
                     Sponsor.create({
                        name: "Poornima Byre Gowda",
                        email: "pg0018@uah.edu",
                        image: "https://scontent.xx.fbcdn.net/v/t1.0-9/14724561_1139956282741806_2193845329905931970_n.jpg?oh=9327894c9e72e27627719ea3757bd9d0&oe=588BBEF5",
                     }, function(err,Sponsor){
                         if(err){
                             console.log(err);
                         }
                         else {
                              console.log(Sponsor);
                              Sponsor.Sponserships.push(Sponsorship)
                              Sponsor.save(function(err,data){
                                  if (err){
                                    //   console.log(err);
                                
                                  }
                                  else {
                                      console.log(data)
                                  }
                              });
                         }
                     });
              }
          });
    
    }
});

// Animal.findById("581bab2fb020fe17d8ac6a28",function(err,Animal){
//     if (err) {
//         console.log(err);
//     }
//     else {
//         // Create the sponsor
//           Sponsorship.create ({
//             AID : Animal.toObject()._id,
//             startdate: new Date(2016, 11, 17),
//             lastdate: new Date(2017, 11, 17),
//             amount: 150
//           }, function(err,Sponsorship){
//               if (err)
//               {
//                   console.log(err);
//               }
//               else {
//                      //console.log(Sponsorship);
//                     // console.log( Sponsorship.toObject()._id);
//                      Sponsor.findById("581d07c32b4d71469fec2440", function(err,Sponsor){
//                          if(err){
//                              console.log(err);
//                          }
//                          else {
//                               console.log(Sponsor);
//                               Sponsor.Sponserships.push(Sponsorship)
//                               Sponsor.save(function(err,data){
//                                   if (err){
//                                       console.log(err);
                                
//                                   }
//                                   else {
//                                       console.log(data)
//                                   }
//                               });
//                          }
//                      });
//               }
//           });
    
//     }
// });

// Animal.findById("581bab2fb020fe17d8ac6a28",function(err,Animal){
//     if (err) {
//         console.log(err);
//     }
//     else {
//         // Create the sponsor
//           Sponsorship.findById ("581d05ee7aeeaf437f0724a5", function(err,Sponsorship){
//               if (err)
//               {
//                   console.log(err);
//               }
//               else {
//                      //console.log(Sponsorship);
//                     // console.log( Sponsorship.toObject()._id);
//                      Sponsor.findById("581d05b84ea719435aa40fb3", function(err,Sponsor){
//                          if(err){
//                              console.log(err);
//                          }
//                          else {
//                               console.log(Sponsor);
//                               Sponsor.Sponserships.push(Sponsorship)
//                               Sponsor.save(function(err,data){
//                                   if (err){
//                                       console.log(err);
                                
//                                   }
//                                   else {
//                                       console.log(data)
//                                   }
//                               });
//                          }
//                      });
//               }
//           });
    
//     }
// });

// Sponsor.findById("581bfc3145c0832ce7bbdcd8").populate("Sponsorships").exec(function(err,Sponsor){
//     if (err)
//     {
//         console.log(err);
//     }
//     else 
//     {
//         console.log(Sponsor.toObject().Sponsorships[0]);
//     }
    
// });