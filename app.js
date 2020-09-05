//https://alligator.io/js/async-functions/
var express = require("express")
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var comment = require("./models/comment");
var campground = require("./models/campground");

//var seeddb = require("./models/seeds");
//seeddb();
mongoose.connect('mongodb://localhost:27017/yelp_camp',{ useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("mongodb conected...")
})




app.use(bodyParser.urlencoded({extended: true}));







app.set("view engine", "ejs")

app.get("/", function(req,res){
    res.render("landing")
})

app.get("/campground", function(req, res){
    campground.find({},function(err, campground){
        if(err){
            console.log(err)
        }else{
            res.render("index",{campground:campground})
        }
    })
   
    //res.render("campground",{campground: campground})
})


app.post("/campground",function(req, res){
   var name = req.body.name
   var img = req.body.img
   var newcampground = {name: name, img: img}
   campground.create(newcampground, function(err, newlycreated){
       if(err){
           console.log(err)
       }else{
           res.redirect("/campground")
       }
   })
   
})
app.get("/campground/new", function(req,res){
    res.render("new.ejs")
})

app.get("/campground/:id", function(req,res){
    //console.log(req.params)
    //var Id = req.params.id
    //var objId = new ObjectId(Id)
    campground.findById(req.params.id).populate("comment").exec(function(err, foundcampground){
        if(err){
            console.log(err);
        }else{
            console.log(foundcampground)
            res.render("show",{campground: foundcampground})
        }
    })
})

app.get("/campground/:id/comment/new",function(req,res){
    campground.findById(req.params.id, function(err,campground){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new", {campground: campground})
        }
    })
})
 app.post("/campground/:id/comment", function(req,res){
     campground.findById(req.params.id, function(err, campground){
         if(err){
             res.redirect("/campground")
         }else{
             comment.create(req.body.comment, function(err, comment){
                 if(err){
                     console.log(err)
                 }else{
                    campground.comment.push(comment);
                    campground.save()
                    res.redirect("/campground/" + campground._id)
                     
                 }
             })
             
         }
     })
 })

app.listen(3000, ()=> console.log("yelpcamp servaer has strted"))