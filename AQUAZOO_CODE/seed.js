var mongoose = require("mongoose");

// connect to the database

mongoose.connect("mongodb://localhost/aquazoo", function(err, db) {
  if(!err) {
    console.log("We are connected");
  }
});


 var Animal = require("./models/animal");
var Description = require ("./models/description");




var Description_Data = [
    
      {
            image               : "http://zoomadrid.com/sites/default/files/styles/fichaslide_breakpoints_theme_zoo2015_desktop_1x/public/sliders/panda-gigante.jpg?itok=ZSbrpYtC",
            commonname          : "Giant pandas",
            scientific_name     : "Ailuropoda melanoleuc",
            type                : "Mammals",
            
            average_lifespan    : 100,
            avg_weight          : 120,
            avg_size            :  80,
            
            habitat             : "Mountain plateau",
            continent           : "Asia",
            classification      : "Herbivore",
        
            status_of_conservation: "ENDANGERED"
            
      },
      
      {
            image               : "http://zoomadrid.com/sites/default/files/styles/fichaslide_breakpoints_theme_zoo2015_desktop_1x/public/sliders/tortuga_verde.jpg?itok=l6-kL77J",
            commonname          : "Green Sea Turtle",
            scientific_name     : "Chelonia mydas",
            type                : "Reptiles",
            
            average_lifespan    : 100,
            avg_weight          : 120,
            avg_size            :  80,
            
            habitat             : "Oceans and seas",
            continent           : "Central America and Caribbean",
            classification      : "Herbivore",
        
            status_of_conservation: "ENDANGERED"
            
      }
    
    
    ];
    
    
    function seedDB() {
        // Delete all the Animals
     Animal.remove ({},function (err){
         if(err)
         {
             console.log(err);
         }
     });
     
     // Delete the descriptions and add Descriptions
     Description.remove({},function(err){
            if (err)
            {
                console.log(err);
            }
            else {
                        Description_Data.forEach(function(seed)
                    {
                        
                        Description.create(seed,function(err,seed)
                        {
                            if (err)
                            {
                                console.log(err);
                                
                            }
                            else { // console.log(seed)
                            }
                        
                    })
                    });
            }
        });
        
        // Inserting the Animals
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
        
        
    
}
    
    module.exports = seedDB;