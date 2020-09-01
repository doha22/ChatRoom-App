var express = require("express");
//const router = express.Router();
var mongoose = require('mongoose');
let User = require('../models/user');
const auth = require('../middleware/auth')
// User = mongoose.model("User");


exports.register = async (req, res) => {
    const user = new User(req.body)
 console.log(user.email)


    try {
    email = req.body.email
        const userExists = await User.findOne({
            email,
          });
        
          if (userExists)
          {console.log("User with same email already exits.")}
        
        
        console.log("new user"+user) 
        await user.save()
//             else  if (err.code == 11000){
 
//     res.status(422).send(['Duplicate email adrress found.']);
// }


            const token =  user.generateAuthToken()
            res.status(201).send({message: "User registered successfuly!" ,token})
       
        //const token = await user.generateAuthToken()

        // console.log("user and token "+user + token) 
        // res.status(201).send({ saveduser, token })
      
    } catch (e) {
      console.log(e)
        res.status(400).send(e)
    }

  }

exports.login = async (req, res) => {
    email = req.body.email
    password = req.body.password
  
    try {
        const user = await User.findOne({email : email , password : password})
        console.log("email"+email)     
   
    if(!user){console.log("not user")}
    const token = await user.generateAuthToken()
    console.log("token"+token)
    
    res.send({ message: "User logged in successfully!",user, token })
  } catch (e) {
    res.status(400).send()
  }
}