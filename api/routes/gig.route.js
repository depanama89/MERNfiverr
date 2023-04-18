import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import {
    createGig, 
    deleteGig,
    getGig,
    getGigs
} from "../controllers/gig.controller.js"

const router= express.Router()

router.route("/").post( verifyToken, async(req,res,next)=>{
    res.status(200).json({message:"Create Contacts"})
});
router.delete("/:id",verifyToken,deleteGig)
router.get("/single/:id",verifyToken,getGig)
router.get("/single/:id",verifyToken,getGigs)

export default router