//creating an application
const express = require("express");
const app = express();
//mongodb connection 
const mongoose = require("mongoose");
//giving configuration for our .env file
const dotenv = require("dotenv");

dotenv.config(); 

//here we are connecting our application with mongodb, the normal way to connect the db would 
//have us have our mongodb url in the line that reads "process.env.MONGO_URL", but since we are
//using an env file we are storing our url which contains our username and password inside of it 
//and then connecting our application and DB safely. Also adding a console log to show us we are 
//successfully connected to our DB or if we have a error with our DB.
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(()=>console.log("DB Connection Successful!")).catch((err) => cpnsole.log(err))

//anytime we run npm start we are just console logging to ensure backend is running
app.listen(8800, ()=>{
    console.log("Backend Server is Running")
});