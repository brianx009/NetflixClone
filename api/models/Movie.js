const mongoose = require('mongoose');

//schema for user that holds information for Movie
const MovieSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true},
    desc: { type: String},
    image: { type: String},
    imgTitle: { type: String},
    imgSm: { type: String},
    trailer: { type: String},
    video: { type: String},
    year: { type: String},
    limit: { type: Number},
    genre: { type: String},
    isSeries: { type: Boolean, default: false},

},
//time stamp 
{ timestamps: true}
);

//export of userschema 
module.exports = mongoose.model("Movie", MovieSchema);