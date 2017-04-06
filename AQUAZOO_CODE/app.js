
//  INITIAL SET UP
var mongoose               =    require ("mongoose"),
    User                   =    require("./models/user"),
    passport               =    require ("passport"),
    LocalStrategy          =    require("passport-local"),
    methodOverride          = require("method-override"),
    passport_local_Mongoose =   require("passport-local-mongoose"),
    express                =    require("express"),
    app                    =    express(),
    bodyParser             =    require("body-parser");
   

//  BASIC SET UP 

app.set("view engine","ejs");
app.use (bodyParser.urlencoded({extended : true}));
app.use(methodOverride("_method"));

// AUTHENTICATION

app.use(require("express-session")({
  secret: "I am the admin",
  resave:false,
  saveUninitialized: false
  
}))

app.use(passport.initialize());
app.use(passport.session());
app.use (bodyParser.urlencoded({extended : true}));

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// CONNECT MONGO
 mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/aquazoo", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});
    
// IMPORT SCHEMA 

var Animal = require("./models/animal");
var Description = require ("./models/description");
var Sponsorship = require ("./models/sponsorship");
var Sponsor = require ("./models/sponsor");
var Trainer = require ("./models/trainer");

// SEEDING 

var seedDB = require("./seed");
//seedDB();


// HOME root
app.get('/', function(req, res) {
  res.render("home");
});

//USER INDEX 

app.get('/Animals', function(req, res) {
 Description.find({},function(err,viewAnimals){
   if (err){ console.log(err)}
   else { 
      //console.log(viewAnimals);
      res.render("index", {Animal:viewAnimals});
      }
 });
});

// USER  SHOW
app.get('/Animals/:id', function(req, res){
    Description.findById(req.params.id,function(err, foundAnimals) {
     if (err){ console.log(err)}
      else { res.render("show",{Animal:foundAnimals }); }
  });
});

// ADMIN
   app.get("/admin",isLoggedIn,function(req,res){ 
     res.render("admin"); 
    });

// ADMIN DESCRIPTION INDEX
 app.get("/description",isLoggedIn,function(req,res){ 
      Description.find({},function(err,viewAnimals){
   if (err){ console.log(err)}
   else { 
       //console.log(viewAnimals);
      res.render("description", {Animal:viewAnimals});
      }
 });
 });

// ADMIN DESCRIPTION NEW ROUTE
 app.get("/description/new",isLoggedIn,function(req,res){ 
     res.render("descriprion_new"); 
     
 });

// ADMIN DESCRIPTION CREATE ROUTE
app.post("/description",isLoggedIn,function(req,res){ 
    // create the blog 
     //console.log(req.body.description);
     Description.create(req.body.description, function(err,newblog){ 
         if (err)
         {
             res.render ("descriprion_new");
         }
         else
         {
             res.redirect("/description");
         }
         
     });    
 });

// ADMIN DESCRIPTION EDIT ROUTE

app.get ("/description/:id/edit", isLoggedIn,function(req, res) {
    
     Description.findById (req.params.id, function(err,received){
       if (err)
       {
           res.redirect("/description");
       }
       else 
       {
           //console.log(received);
           res.render("description_edit",{description: received});
       }
   
});
});


// ADMIN DESCRIPTION UPDATE ROUTE

app.put("/description/:id",isLoggedIn, function (req,res){
    
    Description.findByIdAndUpdate(req.params.id,req.body.description, function(err,updated){
        if(err)
        {
            res.redirect("/Description");
        }
        else {
            //console.log(updated);
            res.redirect("/Animals/" + req.params.id );
        }
    });
});  

// ADMIN DESCRIPTION DELETE ROUTE

app.get("/description/delete/:id", isLoggedIn,function (req,res){
    
    Description.findByIdAndRemove(req.params.id,req.body.description, function(err,updated){
        if(err)
        {
            res.redirect("/Description");
        }
        else {
            //console.log(updated);
            res.redirect("/Description");
        }
    });
}); 


// ADMIN ANIMAL INDEX

 app.get("/Animal",isLoggedIn,function(req,res){ 
      Animal.find({},function(err,viewAnimals){
   if (err){ console.log(err)}
   else { 
       //console.log(viewAnimals);
      res.render("animal", {Animal:viewAnimals});
      }
 });
 });


// ADMIN ANIMAL  SHOW
app.get('/Animal/:id', isLoggedIn,function(req, res){
    Animal.findById(req.params.id,function(err, foundAnimals) {
     if (err){ console.log(err)}
      else { 
            //console.log(foundAnimals.toObject().sid)
            Description.findById(foundAnimals.toObject().sid ,function(err, foundDescription) {
            if (err){ console.log(err)}
            else {
                //console.log(foundDescription)
                res.render("animal_show",{Animal:foundAnimals, description:foundDescription  }); 
            }
            });
            }
  });
});


 
// ADMIN ANIMAL EDIT ROUTE

app.get ("/Animal/:id/edit", isLoggedIn,function(req, res) {
    
     Animal.findById (req.params.id, function(err,received){
       if (err)
       {
           res.redirect("/Animal");
       }
       else 
       {
           //console.log(received);
           res.render("animal_edit",{Animal: received});
       }
   
});
});

// ADMIN ANIMAL UPDATE ROUTE

app.put("/Animal/:id",isLoggedIn, function (req,res){
    console.log(req.body.Animal);
    Animal.findByIdAndUpdate(req.params.id,req.body.Animal, function(err,updated){
        if(err)
        {
            res.redirect("/Animal");
        }
        else {
            //console.log(updated);
            res.redirect("/Animal/" + req.params.id );
        }
    });
});  


// ADMIN NEW ANIMAL

app.get ("/NEW_ANIMAL", isLoggedIn,function(req, res) {
            Description.find({},function (err, description){
                if (err)
                {
                    console.log(err)
                }
                else {
                    //descriptionconsole.log(description)
                    res.render("animal_new",{description:description});
                }
            });
            
       });
       
       
// ADMIN ANIMAL CREATE ROUTE

   app.post("/Animal",isLoggedIn,function(req,res){ 
    // create the blog 
     //console.log(req.body.Animal.commonname);
     Description.find ({commonname:req.body.Animal.commonname},function(err,output){
    if (err)
    {console.log(err);}
    else {
      
      //console.log(output[0].toObject()._id);
              Animal.create({
            d_t     :   new Date,
            age     :   req.body.Animal.age,
            weight  :   req.body.Animal.weight,
            size    :   req.body.Animal.size,
            gender  :   req.body.Animal.gender,
            location:   req.body.Animal.location,
            sid      :  output[0].toObject()._id, 
        },function (err,Animal) {
          if (err) {
              console.log(err); 
              } 
          else {
              //console.log(Animal);
              res.redirect("/Animal");
          }
        });
          
    }
});
         
 });
 
 // ADMIN ANIMAL DELETE ROUTE

app.get("/Animal/delete/:id",isLoggedIn, function (req,res){
    
    Animal.findByIdAndRemove(req.params.id,req.body.description, function(err,updated){
        if(err)
        {
            res.redirect("/Animal");
        }
        else {
            //console.log(updated);
            res.redirect("/Animal");
        }
    });
}); 

 
 
 // SPONSORS INDEX PAGE
 
  app.get("/sponsor",isLoggedIn,function(req,res){ 
      Sponsor.find({},function(err,viewsponsors){
   if (err){ console.log(err)}
   else { 
       //console.log(viewAnimals);
      res.render("sponsor", {Sponsor:viewsponsors});
      }
 });
 });
 
 // SPONSORS SHOW PAGE

app.get('/sponsor/:id', isLoggedIn,function(req, res){
    Sponsor.findById(req.params.id).populate("Sponsorships").exec(function(err,Sponsor){
    if (err)
    {
        console.log(err);
    }
    else 
    {
        //console.log(Sponsor);
        res.render("sponsor_show", {Sponsor:Sponsor});
    }
    
});
});

 // SPONSORSHIP SHOW PAGE
 
app.get('/sponsorship/:id',isLoggedIn, function(req, res){
    Sponsorship.findById(req.params.id, function(err,Sponsorship){
    if (err)
    {
        console.log(err);
    }
    else 
    {
        //console.log(Sponsor);
        res.render("sponsorship_show", {Sponsorship:Sponsorship});
    }
    
});
});

 // SPONSORSHIP EDIT PAGE
 app.get ("/sponsorship/:id/edit", isLoggedIn,function(req, res) {
    
     Sponsorship.findById (req.params.id, function(err,Sponsorship){
       if (err)
       {
           res.redirect("/sponsorship/:id");
       }
       else 
       {
           //console.log(received);
           res.render("sponsorship_edit",{Sponsorship: Sponsorship});
       }
   
});
});

// SPONSORSHIP UPDATE PAGE

app.put("/sponsorship/:id",isLoggedIn, function (req,res){
    //console.log(req.body.Sponsorship);
     //console.log(req.body.year)
     // console.log(req.body.month)
      // console.log(req.body.date)
      if( req.body.Sponsorship.amount < 0){ 
        
        }
        else {
                Sponsorship.findByIdAndUpdate(req.params.id,{
                    amount: req.body.Sponsorship.amount,
                    lastdate: new Date(req.body.year,req.body.month,req.body.date)
                }, function(err,updated){
                    if(err)
                    {
                        res.redirect("/sponsorship/" + req.params.id );
                    }
                    else {
                       // console.log(updated);
                        res.redirect("/sponsorship/" + req.params.id );
                    }
                });
        }
}); 
 
 // Delete the SPONSORSHIP
 app.get ("/delete/:id1/:id2",isLoggedIn, function(req,res){
     //console.log(req.params.id2);
    Sponsor.findOneAndUpdate({ _id: req.params.id1}, {$pull: {Sponserships:req.params.id2}}, function(err, data){
        if(err) {
          return res.status(500).json({'error' : 'error in deleting address'});
        }
        Sponsorship.findByIdAndRemove(req.params.id2,function(err,data){
            if(err)
            {
                console.log(err);
            }
            else{
                 res.redirect("/sponsor/" + req.params.id1)
            }
            
        })
      });
 });
 
 // SPONSORSHIP NEW PAGE
 app.get ("/sponsorship/:id/new", isLoggedIn,function(req, res) {
    
     Animal.find({}, function(err,Animal){
       if (err)
       {
           res.redirect("/sponsorship/:id");
       }
       else 
       {
                  
        Sponsor.findById(req.params.id, function(err,Sponsor){
               if (err)
               {
                   res.redirect("/sponsorship/:id");
               }
               else 
               {
                   //console.log(Sponsor);
                   //console.log(Animal);
                   res.render("sponsorship_new",{Sponsor: Sponsor, Animal: Animal});
               }});
          
       }
   
});
});


 app.post("/sponsor/:id",isLoggedIn,function(req,res){ 
    //console.log(req.body.lastdate);
    //console.log(req.body.animal_id);
    if( req.body.amount < 0){ 
          
        }
        else {
              
    Animal.findById(req.body.animal_id,function(err,Animal){
    if (err) {
        console.log(err);
    }
    else {
        
        // console.log(Animal)
        // Create the sponsor
          Sponsorship.create ({
             AID : Animal.toObject()._id,
            startdate: new Date(req.body.startyear, req.body.startmonth, req.body.startdate),
            lastdate: new Date(req.body.lastyear, req.body.lastmonth, req.body.lastdate),
            amount: req.body.amount
          }, function(err,Sponsorship){
              if (err)
              {
                  console.log(err);
              }
              else {
                     //console.log(Sponsorship);
                    // console.log( Sponsorship.toObject()._id);
                     Sponsor.findById(req.params.id, function(err,Sponsor){
                         if(err){
                             console.log(err);
                         }
                         else {
                             // console.log(Sponsor);
                              Sponsor.Sponserships.push(Sponsorship)
                              Sponsor.save(function(err,data){
                                  if (err){
                                      console.log(err);
                                
                                  }
                                  else {
                                      //console.log(data)
                                      res.redirect("/sponsor/" + req.params.id )
                                  }
                              });
                         }
                     });
              }
          });
    
    }
});
        }    
 });
 
 // NEW SPONSOR
 app.get("/NEW_SPONSOR",isLoggedIn,function(req,res){ 
     Animal.find({},function(err,Animal){
         if(err){
             console.log(err);
         }
         else
         {
             res.render("sponsor_new",{Animal:Animal})
         }
     })
 });
 
  // POST NEW SPONSOR
  
 app.post("/sponsor",isLoggedIn,function(req,res){ 
     //console.log(req.body.name);
     if( req.body.amount < 0){ 
          res.redirect("/NEW_SPONSOR")
        }
        else {
              
                     Animal.findById("581d5ce65622e5627959ed5b",function(err,Animal){
                    if (err) {
                        console.log(err);
                    }
                    else {
                        // Create the sponsor
                          Sponsorship.create ({
                            AID : Animal.toObject()._id,
                            startdate: new Date(req.body.startyear, req.body.startmonth, req.body.startdate),
                            lastdate: new Date(req.body.lastyear, req.body.lastmonth, req.body.lastdate),
                            amount: req.body.amount
                          }, function(err,Sponsorship){
                              if (err)
                              {
                                  console.log(err);
                              }
                              else {
                                     //console.log(Sponsorship);
                                     //console.log( Sponsorship.toObject()._id);
                                     Sponsor.create({
                                        name:  req.body.name,
                                        email: req.body.email,
                                        image: req.body.image,
                                     }, function(err,Sponsor){
                                         if(err){
                                             console.log(err);
                                         }
                                         else {
                                              //console.log(Sponsor);
                                              Sponsor.Sponserships.push(Sponsorship)
                                              Sponsor.save(function(err,data){
                                                  if (err){
                                                    //   console.log(err);
                                                
                                                  }
                                                  else {
                                                      //console.log(data)
                                                      res.redirect("/sponsor")
                                                  }
                                              });
                                         }
                                     });
                              }
                          });
                    
                    }
                });
        }
 });
 
 // UPDATE SPONSOR
 app.get("/sponsor/:id/edit",isLoggedIn,function(req,res){ 
     Sponsor.findById(req.params.id , function(err, received) {
        if(err) 
               {
                   console.log(err);
               }
               res.render("sponsor_edit",{Sponsor:received })
           })
 });
 
 // POST UPDATE SPONSOR     
app.put("/sponsor/:id", isLoggedIn,function (req,res){
    
    Sponsor.findByIdAndUpdate(req.params.id,req.body.Sponsor, function(err,updated){
        if(err)
        {
            res.redirect("/sponsor");
        }
        else {
            //console.log(updated);
            res.redirect("/sponsor/" + req.params.id );
        }
    });
});

// DELETE SPONSER
   
app.get("/sponsor/delete/:id",isLoggedIn, function (req,res){
    
    Sponsor.findByIdAndRemove(req.params.id, function(err,updated){
        if(err)
        {
            res.redirect("/sponsor");
        }
        else {
            //console.log(updated);
            res.redirect("/sponsor"  );
        }
    });
});

// TRAINER
app.get("/trainer",isLoggedIn,function(req,res){ 
      Trainer.find({},function(err,viewtrainerss){
   if (err){ console.log(err)}
   else { 
       //console.log(viewAnimals);
      res.render("trainer", {Trainer:viewtrainerss});
      }
 });
 });

// SHOW TRAINER PAGE
app.get('/trainer/:id', isLoggedIn,function(req, res){
    Trainer.findById(req.params.id,function(err, Trainer) {
     if (err){ console.log(err)}
      else { 
            //console.log(Trainer)
                res.render("trainer_show",{Trainer:Trainer }); 
            }
            
  });
});

// UPDATE TRAINER

 app.get("/trainer/:id/edit",isLoggedIn,function(req,res){ 
     Trainer.findById(req.params.id , function(err, received) {
        if(err) 
               {
                   console.log(err);
               }
               else{
                  // console.log(received)
               res.render("trainer_edit",{Trainer:received })
               }
           })
 });

app.put("/trainer/:id", isLoggedIn,function (req,res){
    
    Trainer.findByIdAndUpdate(req.params.id,req.body.Trainer, function(err,updated){
        if(err)
        {
            res.redirect("/trainer");
        }
        else {
            //console.log(updated);
            res.redirect("/trainer/" + req.params.id );
        }
    });
});

// CREATE TRAINER


// DELETE TRAINER
 
app.get("/trainer/delete/:id", isLoggedIn,function (req,res){
    
    Trainer.findByIdAndRemove(req.params.id, function(err,updated){
        if(err)
        {
            res.redirect("/trainer");
        }
        else {
            //console.log(updated);
            res.redirect("/trainer"  );
        }
    });
});

// NEW TRAINER
 app.get("/NEW_TRAINER",isLoggedIn,function(req,res){ 
     Animal.find({},function(err,Animal){
         if(err){
             console.log(err);
         }
         else
         {
             res.render("trainer_new",{Animal:Animal})
         }
     })
 });

app.post("/trainer",isLoggedIn,function(req,res){
    console.log("req.body.Trainer")
   Trainer.create(req.body.Trainer,function(err,trainer){
       if(err)
       {
           console.log(err)
       }
       else{
           res.redirect("/trainer")
       }
   }) 
});

//########################
// AUTHENTICATION ROUTES
//########################

app.get("/register",function(req,res){
    res.render("registerfile")
});

app.post("/register", function(req,res){
     //console.log(req.body.username)
     //console.log(req.body.password)
     User.register(new User ({username:req.body.username}), req.body.password, function(err, User){
       if (err){
         console.log(err);
         res.redirect("/register")
       }
         passport.authenticate("local")(req,res,function(){
          res.redirect("/admin")
       })
     })
})

//########################
// LOGIN ROUTES
//########################

app.get("/login",function(req,res){
    res.render("login")
});

app.post("/login", passport.authenticate("local",{
  successRedirect: "/admin",
  failureRedirect: "/login"
}),function (req, res) {
})

//########################
// LOGOUT ROUTES
//########################
app.get("/logout",function(req,res){
    req.logout();
    res.redirect("/")
});

//########################
// AUTHENTICATION
//########################
 function isLoggedIn(req,res,next){
   if(req.isAuthenticated()){
     return next()
   }
   res.redirect("/login");
 }

// server connection
app.listen (process.env.PORT,process.env.IP,function(req, res) {
  console.log('server has started');
});



