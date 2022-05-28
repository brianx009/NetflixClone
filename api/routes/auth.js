//route for authentication register/login method
const router = require('express').Router();
const { response } = require('express');
const User = require("../models/User")
//npm install crypto js in order to make a created users password encrypted and not a visible string
const CryptoJS = require("crypto-js");
// JsonWebToken in order to create an access token for users, making CRUD process easier
const jwt = require("jsonwebtoken");

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

//Login
//taking in users email and password and sending them back a response if they are a user existing in our DB.
router.post("/login", async (req,res)=>{
    try{
        //try to find user based on the email provided
        //condition states "if email = req.body.email" (signed up by user), it means we have that user
        const user = await User.findOne({email: req.body.email});
        //if there is no user, send an error message
        !user && res.status(401).json("Wrong Email or Password, please try again.")

        //decryption of the password in MongoDB by using Crypto JS , and check to see if the password submitted is the same
        //as the password we set up in Postman
        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

        //if original password does not equal the reqested password from Postman then we send a error message
        originalPassword !== req.body.password && 
            res.status(401).json("Wrong Email or Password, please try again.")

        // access token that will be created which will hold the user id and admin status. Hides the information inside the token, and for ease of  use
        //we are also using the same Secret key we used earlier in our application. Also set up to expire in 5 days, after 5 days it will ask us to login again. 
        const accessToken = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin},
            process.env.SECRET_KEY,
            {expiresIn: "5d"}
        );
        //this removes any password information that might show up when we use Postman to check if the username/password is correct 
        const{ password, ...info} = user._doc;

        // else if they do match then we send a successful status 200 and access token which holds information about the user
        res.status(200).json({...info, accessToken})

    }catch(err){
        //error message 500
        res.status(500).json(err)
    }
})
//exports our router
module.exports = router;