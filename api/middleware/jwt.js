import jwt from "jsonwebtoken";
import creatorError from "../utils/creatorError.js";
export const verifyToken = (req, res, next)=>{
    const token = req.cookies.accessToken
    if(!token) return next(creatorError(401,"You are not authentificated!"))

    jwt.verify(token,process.env.JWT_KEY,async(err,payload)=>{
        if(err) return next(creatorError(403,"Token is not valid"))
        req.userId = payload.id;
        req.isSeller = payload.isSeller;
        next()

    })
}