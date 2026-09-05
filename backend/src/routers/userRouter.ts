import type {Response, Request} from 'express';
import userModel from "../models/userModel.js";
import express from 'express';

const router = express.Router();

router.get("/user/users", async (_req:Request,res:Response) => {
    try{
        const response = await userModel.find({});
        res.status(200).json(response);
    }catch(err){
        if(err instanceof Error){
            res.status(500).json(err.message)
        }
    }
});

router.put("/user/password/:id", async(req,res) => {
    const {password} = req.body;
    const {id} = req.params;
    try{
        await userModel.findByIdAndUpdate(id, password);
        res.status(200).json("Successfuly updated password")
    }catch(err){
        if(err instanceof Error){
            res.status(500).json(err.message)
        }
    }
});

router.put("/user/role/:id", async(req,res) => {
    const {role} = req.body;
    const {id} = req.params;
    try{
        await userModel.findByIdAndUpdate(id, role);
        res.status(200).json("Successfuly updated role")
    }catch(err){
        if(err instanceof Error){
            res.status(500).json(err.message)
        }
    }
});

router.delete("/user", async(req:Request,res:Response) => {
    const {id} = req.params;
    try{
       await userModel.findByIdAndDelete(id);
       res.status(201).json({message:"has been removed successfully"})
    }catch(err){
        if(err instanceof Error){
            res.status(500).json(err.message)
        }        
    }
});
