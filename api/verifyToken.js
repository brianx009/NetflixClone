const jwt = require("jsonwebtoken")

function verify(req,res,next){
    //get jwt from the "header" section in Postman
    const authHeader = req.headers.token;
    //if the header token exists then we take the actual token and verify
    if(authHeader){
        //if token exists then we parse the data and take the data after the space(which is why we take the data located in index 1)
        const token = authHeader.split(" ")[1];
        
        //in order to verify we take the token and our secret key, and we return either a error or our user
        //credentials
        jwt.verify(token, process.env.SECRET_KEY,(err,user)=>{
            //if there is an error we catch it with an error message 403 in Postman when someone enters
            //a toekn that does not belong to any user
            if(err) res.status(403).json("Token is not Valid!");
            //if no error we assign a new request
            req.user = user;
            //go to actual router in users if everything else is successful
            next();
        })

    //else if we provide no token in Postman then we send a error message
    }else{
        return res.status(401).json("You are not Authenticated!")
    }
}

module.exports = verify;