const {User} = require("../../models/index")
const {verifyPassword} = require("../../helpers/bcrypt")
const {generateToken} = require('../../helpers/jwt')

let addNewUser = async (req,res,next)=>{
    let {username,email,password,phoneNumber} = req.body
    try {
        let checkUser = await User.findOne({
            where:{
                username
            }
        })
        if(checkUser){
            res.status(400).json({message:"user exist"});
        } else {
            let addUser = await User.create({
                username,email,password,phoneNumber
            })
            if(addUser){
                res.status(200).json(addUser)
            }
        }
    } catch (error) {
        res.status(500).json({message:error})
    }
}

let loginUser = async (req,res,next) =>{
    let {username,password} = req.body
    try {
        let checkUser = await User.findOne({
            where:{
                username
            }
        })
        if(!checkUser){
            res.status(400).json({message:"user / password invalid"})
        } else {
            let checkPassword = verifyPassword(password,checkUser.password)
            if(!checkPassword){
                res.status(400).json({message:"user / password invalid"})
            }
            let token = generateToken({id:checkUser.id,username,email:checkUser.email,phoneNumber:checkUser.phoneNumber})
            res.status(200).json({token,username:checkUser.username})
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error})
    }
}


let editProfile = async (req,res,next) =>{
    let {id} = req.params
    let {username,email,phoneNumber} = req.body

    try {
        let checkUser = await User.findOne({
            where:{
                username:id
            }
        })
        if(checkUser){
            let updateUser = await User.update(
                {
                    username:username ? username : checkUser.username,
                    email:email ? email : checkUser.email,
                    phoneNumber:phoneNumber ? phoneNumber : checkUser.phoneNumber
                },
                {
                    where:{
                        username:id
                    }
                }
                )
            res.status(200).json({message:"User Profile Updated"})
        } else {
            res.status(404).json({message:"User Not Found"})
        }
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

module.exports = {addNewUser,loginUser,editProfile}