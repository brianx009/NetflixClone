const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");


//Create
//using post because it is used for creating a new movie
router.post("/", verify, async (req,res)=>{
//if requested user id is equal to the requested parameter id or the user is an admin, we could update the user
if(req.user.isAdmin){
    //creating new movie, takes the request in the Postman body and we will try saving the movie
    //into our DB
    const newMovie = new Movie(req.body);
    try{
        //trying to save the new movie 
        const savedMovie = await newMovie.save();
        //upon success we send out a success 201 message to user
        res.status(201).json(savedMovie);
    }catch(err){
        //Error catch if movie is not successfully able to be saved
        res.status(500).json(err)
    }
//if user is not admin, send error
}else{
    res.status(403).json("You are not an Administrator!")

}
});

//Update
//using put because it is used for updating a new movie, and we are searching it up based on its ID
router.put("/:id", verify, async (req,res)=>{
    //if requested user id is equal to the requested parameter id or the user is an admin, we could update the user
    if(req.user.isAdmin){
        try{
            //finding an existing movies ID. Takes ID, finds movie, and sets new data inside.
            const updatedMovie = await Movie.findById(
                req.params.id,
                {
                    $set: req.body,
                },
                // has to be set to true because if not we will see the old movie not the new one
                { new: true }
                    );
            //upon success we send out a success 202 message to user
            res.status(202).json(updatedMovie);
        }catch(err){
            //Error catch if movie is not successfully able to be updated
            res.status(500).json(err)
        }
    //if user is not admin, send error
    }else{
        res.status(403).json("You are not an Administrator!")
    
    }
    });

//Delete
//using put because it is used for updating a new movie, and we are searching it up based on its ID
router.delete("/:id", verify, async (req,res)=>{
    //if requested user id is equal to the requested parameter id or the user is an admin, we could update the user
    if(req.user.isAdmin){
        try{
            //finding an existing movies ID and deleting it. 
            await Movie.findByIdAndDelete(req.params.id);
            //upon success we send out a success 202 message to user
            res.status(200).json("The movie has been successfully deleted!");
        }catch(err){
            //Error catch if movie is not successfully able to be updated
            res.status(500).json(err)
        }
    //if user is not admin, send error
    }else{
        res.status(403).json("You are not an Administrator!")
    
    }
    });

//Get
//allows any user to search a movies information
router.get("/find/:id", verify, async (req,res)=>{
        try{
            const movie = await Movie.findById(req.params.id);
            res.status(200).json(movie);
        }catch(err){
            //Error catch if movie is not successfully able to be found
            res.status(500).json(err)
        }
        });

//Get Random
//allows any user to get a random movie based on when they click
router.get("/random", verify, async (req,res)=>{
    const type = req.query.type;
    let movie;
        try{
            if (type === "series"){
                movie = await Movie.aggregate([
                    { $match: {isSeries: true} },
                    { $sample: { size: 1} },
                ]);
            }else{
             movie = await Movie.aggregate([
                { $match: {isSeries: false} },
                { $sample: { size: 1} },
            ]);

            }
            res.status(200).json(movie)

        }catch(err){
            //Error catch if movie is not successfully able to be found
            res.status(500).json(err)
        }
        });

//Get All
//Allows admin to see all movies being hosted on the website
router.get("/", verify, async (req,res)=>{
    //if requested user id is an admin we are givin gthem access to view all the movies
    if(req.user.isAdmin){
        try{
            //finds all existing movies and gets them for us
            const movies = await Movie.find();
            //upon success we send out a success 202 message to admin with all movies
            //from most recently added to oldest
            res.status(200).json(movies.reverse());
        }catch(err){
            //Error catch if movie data is unsuccessfully pulled
            res.status(500).json(err)
        }
    //if user is not admin, send error
    }else{
        res.status(403).json("You are not an Administrator!")
    
    }
    });

module.exports = router;