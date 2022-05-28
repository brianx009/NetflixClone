const mongoose = require('mongoose');

//schema for user that holds information for username, email, password, profile pic
//and checks if the user is admin
const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true},
    profilePic: { type: String, default: " "},
    isAdmin: { type: Boolean, default: false},
},
//time stamp 
{ timestamps: true}
);

//export of userschema 
module.exports = mongoose.model("User", UserSchema);