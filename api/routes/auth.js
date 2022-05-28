//route for authentication register/login method
const router = require('express').Router();
const { response } = require('express');
const User = require("../models/User")
//npm install crypto js in order to make a created users password encrypted and not a visible string
const CryptoJS = require("crypto-js");

//Register
//post - for creating
//put- updating
//get- fetching data
//delete - delete
//requires a request whenever user goes to /register, and after creating a user we will reply with a response to user
//we use async function to make asynchronous 
router.post("/register", async (req, res) =>{
    //required credentials for a new user, test with Postman
    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        //using crypto js we are making the before visible password string in mongodb now a encrypted string for safety
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString(),
    });
    try{
        //saves our user inside of our DB
        const user = await newUser.save();
        //status 200/201 is a success message
        res.status(201).json(user)
        }catch(err){
            //status 500 for error catch
            res.status(500).json(err)
        }
});

//exports our router
module.exports = router;