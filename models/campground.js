var mongoose =  require("mongoose")
var campgroundSchema = new mongoose.Schema({
    name: String,
    img: String,
    description: String,
    comment: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment"

    }
        
        
    ]
})


module.exports = mongoose.model("campground", campgroundSchema)