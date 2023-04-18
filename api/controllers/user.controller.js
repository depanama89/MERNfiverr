import User from "../models/user.model.js"
import creatorError from "../utils/creatorError.js"


export const deleteUser = async (req,res)=>{
    const user = await User.findById(req.params.id)
    if(req.userId !== user._id.toString()){
        return next(createError(403,"You can delete only your account"))
    }
    await User.findByIdAndDelete(req.params.id)
    // res.status(200).send("deleted.")
    next(createError(200,"Deleted."))
    
    
}

