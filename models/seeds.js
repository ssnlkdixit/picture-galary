var mongoose =  require("mongoose");

var campground = require("./campground");
var comment = require("./comment")

// data = [ 
//     { 
//     name:"forest",
//     img: "https://www.w3schools.com/css/img_forest.jpg",
//     description: "hey"
// },
// {   name : "desert",
//     img : "https://www.w3schools.com/css/img_lights.jpg",
//     description : "sands"
// },
// {   name : "river",
//     img : "https://www.w3schools.com/css/img_mountains.jpg",
//     description : "yelp"
// }
    
// ]


function seeddb(){
    // campground.remove({},function(err){
    //     if(err){
    //         console.log(err);
    //     }console.log("campground removed")
    //     data.forEach(function(seed) {
            // campground.create({}, function(err, campground){
            //     if(err){
            //         console.log(err)}
            //    else{
                    // console.log("added a new campground")
                    comment.create({
                        text: "thos is a great place",
                        author: "homer"
                    },
                    function(err,comment){
                        if(err){
                            console.log(err)
                        }else{
                            campground.comment.push(comment);
                            campground.save();
                            console.log("create a new comment")
                        
                        }

                    });
                }
            
            
        
        

            
        
            

module.exports = seeddb