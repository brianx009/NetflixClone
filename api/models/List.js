const mongoose = require('mongoose');

//schema for user that holds information for List when navigating through the movie lists on the website.
const ListSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true},
    type: { type: String},
    genre: { type: String},
    content: { type: Array},

},
//time stamp 
{ timestamps: true}
);

//export of userschema 
module.exports = mongoose.model("List", ListSchema);