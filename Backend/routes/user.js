const {Router} = require("express");
const {userModel} = require("../db");
const jwt = require("jsonwebtoken");
const JWT_USER_PASSWORD = "aladid123"
const userRouter = Router();

    userRouter.post("/signup", async function(req,res){
       const {email,password,firstname,lastname} = req.body;
       await userModel.create({
            email: email,
            password: password,
            firstname: firstname,
            lastname: lastname
        })
    res.json({
        message: "Signup Succeeded "
    })
})

userRouter.post("/signin",async function(req,res){
    const {email,password} = req.body;

    const user = await userModel.findOne({
        email: email,
        password: password
    })

    if(user){
    const token =  jwt.sign({
        id: user._id
     },JWT_USER_PASSWORD);
     res.json({
        token: token
    
     })
    }else{
        res.status(403).json({
            message: "Incorrect credentials"
        })
    }
    res.json({
        message: "signin endpoint"
    })
})

userRouter.get("/purchases",function(req,res){
    res.json({
        message: "signin endpoint"
    })
})



module.exports = {
    userRouter: userRouter
}