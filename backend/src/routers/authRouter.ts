import express from 'express';
import userModel from '../models/userModel.js';
import {authValidator} from '../utilities/authValidator.js'
const router = express();

router.post("/signup", async (req,res) => {
    const {email,password} = req.body;
    try{
        authValidator({email,password})
        const existUser = await userModel.findOne({email});
        if(existUser){
            res.status(400).json({message:"User Already exist"});
            return;
        }
        await userModel.create({email,password});
        res.status(201).json({message:"Successfuly Create New Account"})
    }catch(err){
        if(err instanceof Error){
            res.status(500).json(err.message)
        }
    }   
});