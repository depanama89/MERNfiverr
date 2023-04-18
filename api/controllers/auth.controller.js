import User from "../models/user.model.js"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import creatorError from "../utils/creatorError.js";
export const register = async(req,res,next)=>{
    try {
        const hash =bcrypt.hashSync(req.body.password,5)
        const newUser = new User({
            ...req.body,
            password:hash,
        })

        await newUser.save()
        
        next(creatorError("201","User has been created."))
        
    } catch (error) {
        next(creatorError("500","something went wrong")) 
    // console.log(error)
    }
    
}
export const login = async(req,res,next)=>{
    try{
        const user = await User.findOne({username: req.body.username})
        if(!user) return next(creatorError("404","user not found!"))

        const isCorrect = bcrypt.compareSync(req.body.password,user.password)
        if(!isCorrect) return next(creatorError("400","wrong password or usename!"))

        const token =jwt.sign({
            id:user._id,
            isSeller:user.isSeller
        },process.env.JWT_KEY)

        //on doit separer le mot depasse des autres info
        const {password, ...info} = user._doc
        res
            .cookie("accessToken",token,{
            httpOnly:true,
        })
        .status(200)
        .send(info)

    }catch(err){
        // res.status(500).send("Something went wrong")
        next(creatorError("500","Something went wrong"))
    }

}
export const logout = async(req,res)=>{
    res.clearCookie("accessToken",{
        sameSite: "none",
        secure:true,
    })
    .status(200)
    .send("User has been logged out.")

}