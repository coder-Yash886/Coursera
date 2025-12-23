const {Router} = require("express");
const adminRouter = Router();
const {adminModel} = require("../db");
const jwt = require("jsonwebtoken");

const JWT_ADMIN_PASSWORD = "12345ngj5678";


adminRouter.post("/signup",async function(req,res){

    const {email,password,firstname,lastname} = req.body;
           await adminModel.create({
                email: email,
                password: password,
                firstname: firstname,
                lastname: lastname
            })
        res.json({
            message: "Signup Succeeded "
        })


    res.json({
        message: "signup endpoint"
    })
})

adminRouter.post("/signin",async function(req,res){
     
      const {email,password} = req.body;
      
          const admin = await adminModel.findOne({
              email: email,
              password: password
          });
      
          if(admin){
          const token =  jwt.sign({
              id: admin._id

           },JWT_ADMIN_PASSWORD);
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

adminRouter.post("/course",function(req,res){
    res.json({
        message: "course endpoint"
    })
})

adminRouter.put("/course",function(req,res){
    res.json({
        message: "Change the Course"
    })
})

adminRouter.get("/course/bulk",function(req,res){
    res.json({
        message: "All the course endpoint"
    })
})

module.exports = {
    adminRouter : adminRouter
}