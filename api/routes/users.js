const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");


//Update
//using put because it is used for updating
router.put("/:id", verify, async (req,res)=>{
//if requested user id is equal to the requested parameter id or the user is an admin, we could update the user
if(req.user.id === req.params.id || req.user.isAdmin){
    //if we are changing a password that already exists, we use the same steps we did whe first registering a password in /auth
    if(req.body.password){
        req.body.password = CryptoJS.AES.encrypt(
            req.body.password, 
            process.env.SECRET_KEY
            ).toString();
    }
    try{
        //trying to update user by taking the user id and changing the properties
        const updatedUser = await User.findByIdAndUpdate(req.params.id, 
            {
                $set:req.body
            },
            //setting new:true will give us an updated version of the users info where we could see their new name in Postman
            { new:true }
        );
        //if everything is okay we update our user
        res.status(200).json(updatedUser);
    }catch(err){
        res.status(500).json(err)
    }
//if user is not allowed to update, send error
}else{
    res.status(403).json("You can update only your account!")

}
});
//Delete
router.delete("/:id", verify, async (req,res)=>{
    //checks if we are the owner of the account or the administration
    if(req.user.id === req.params.id || req.user.isAdmin){
        //finds user by id and deltes the user
        try{
            await User.findByIdAndDelete(req.params.id);
            //updates with successful delete message
            res.status(200).json("User has Successfully been deleted!");
        }catch(err){
            res.status(500).json(err)
        }
    //if user is not the owner or admin send error message
    }else{
        res.status(403).json("You can delete only your account!")
    }
    });
//Get
//allows access to view a single user
router.get("/find/:id", async (req,res)=>{
        //finds user by id and shows us the users information without the password
        try{
            const user = await User.findById(req.params.id);
            //removes the personal password information of the user
            const { password, ...info } = user._doc;
            //updates with information about the user
            res.status(200).json(user);
        }catch(err){
            res.status(500).json(err)
        }
    });

//Get All
router.get("/", verify, async (req,res)=>{
    //takes a query of new users
    const query = req.query.new;
    //checks if we are admin in order for us to check all the current users
    if(req.user.isAdmin){
        //finds user by id and deltes the user
        try{
            //if there is a query then fetches the last 10 users who joined, else if no query it will fetch all the known users
            const users = query ? await User.find().sort({_id:-1}).limit(10) : await User.find();
            //updates with users information
            res.status(200).json(users);
        }catch(err){
            res.status(500).json(err)
        }
    //if user is not admin send error message
    }else{
        res.status(403).json("You are not Admin! You may not see all users!")
    }
    });
//Get User Stats
//checks users statistics within the last year
router.get("/stats", async (req,res)=> {
    const today = new Date();
    const lastYear = today.setFullYear(today.setFullYear() - 1);

    const monthsArray = ["January","February","March","April","May","June","July",
    "August","September","October","November","December"];

    try{
        const data= await User.aggregate([
            {
            $project:{
                month:{$month: "$createdAt"}
            }
        },{
            $group:{
                _id:"$month",
                total: {$sum:1}
            }
        }
    ]);
    res.status(200).json(data)
    }catch(err){
        res.status(500).json(err)
    }
})

module.exports = router;