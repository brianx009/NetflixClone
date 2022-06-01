const router = require("express").Router();
const List = require("../models/List");
const verify = require("../verifyToken");


//Create
//using post because it is used for creating a new movie
router.post("/", verify, async (req,res)=>{
//if requested user id is equal to the requested parameter id or the user is an admin, we could update the user
if(req.user.isAdmin){
    //creating new movie, takes the request in the Postman body and we will try saving the movie
    //into our DB
    const newList = new List(req.body);
    try{
        //trying to save the new movie 
        const savedList = await newList.save();
        //upon success we send out a success 201 message to user
        res.status(201).json(savedList);
    }catch(err){
        //Error catch if movie is not successfully able to be saved
        res.status(500).json(err)
    }
//if user is not admin, send error
}else{
    res.status(403).json("You are not an Administrator!")

}
});

//Delete
//using delete because it is used for remove a new movie
router.delete("/:id", verify, async (req,res)=>{
    //if requested user id is equal to the requested parameter id or the user is an admin, we could update the user
    if(req.user.isAdmin){
        try{
            //finding  list by id and deleting it from the lists
            await List.findByIdAndDelete(req.params.id);
            //upon success we send out a success 201 message to user
            res.status(201).json("List Successfully Deleted!");
        }catch(err){
            //Error catch if movie is not successfully able to be saved
            res.status(500).json(err)
        }
    //if user is not admin, send error
    }else{
        res.status(403).json("You are not an Administrator!")
    
    }
    });

//Get
//using get because it is used fto retreive movie data
router.get("/", verify, async (req,res)=>{

    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let list = [];
        try{
            //if there is a type query (user clicks series or movies)
            if(typeQuery){
                //if we have a genre Query as well we will fetch 10 random movies or series, and add in a random 
                //list of movies that match that genre 
                if(genreQuery){
                    list = await List.aggregate([
                        { $sample: { size: 10}},
                        { $match: { type: typeQuery, genre: genreQuery}},
                    ]);
                }else{
                    //else if user only selects a movie type but with no genre we only show the movie or series but with no genre
                    list = await List.aggregate([
                        { $sample: { size: 10}},
                        { $match: { type: typeQuery }},
                    ]);
                }

            }else{
                //if there is no type query and we are on the home page we fetch
                //a random sample of 10
                list = await List.aggregate([{$sample: { size: 10 }}]);
            }
            res.status(200).json(list);
        }catch(err){
            //Error catch if movie is not successfully able to be saved
            res.status(500).json(err)
        }
    });
module.exports = router;