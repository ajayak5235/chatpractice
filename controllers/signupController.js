const User = require('../models/user-model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');


const signUp = async (req,res,next) =>{
    try{
        const {name,email,phone,password} = req.body;
        const existingUser = await User.findOne({where:{email:email}})

        if(existingUser){
            res.json({message: "User  Already Exists"})
           
        }else{
            bcrypt.hash(password,10, async (err,hash) =>{
                console.log('err',err);
                await User.create({
                    name:name,email:email,phone:phone,password:hash
                })
                res.status(201).json({message :"User SignUp Succssfully"})
            })
           
        }
    } catch(err){
        console.log(err)
    }
}

const generateToken  = (id,name) =>{
     return jwt.sign({userId:id,name,name} ,'secret')
}


const signIn = async (req,res,next) =>{
    try{
        const {email,password} = req.body;
        const user = await User.findOne({where: {email:email}})
        if(user){
          bcrypt.compare(password,user.password,(err,response) =>{
            if(err){
                res.status(500).json({message:"something went wrong"})
            }
            if(response === true){
                res.status(200).json({
                    success:true,
                    message:"Login Successfully",
                    userId: user.id,
                    token: generateToken(user.id, user.name)
                
                });
            }else{
                res.json({success: false, message:"Password is incorrect"})
            }
          });
           
        }else{
            res.json({message:"Invalid Crendentials"});
        }
    } catch(err){
        console.log(err)
    }


}


module.exports = {
    signUp,
    signIn,
    generateToken
}