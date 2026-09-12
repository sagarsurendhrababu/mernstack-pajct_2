import type {Response, Request} from 'express';
import userModel from "../models/userModel.js";
import bcrypt from 'bcrypt';

export const userGet = async (req:Request,res:Response) => {
    const page = Number(req.query.page || 1);
    const limit = Number(req.query.limit || 10);
    const skip = (page - 1) * limit;   
    const response = await userModel.find({}).skip(skip).limit(limit).sort({_id : -1}).select("-password");
    const totalUsers = await userModel.countDocuments();
    const totalPages = Math.ceil(totalUsers/limit);
    return res.status(200).json({response, pagination:{
        totalUsers, totalPages, hasNextPage: page < totalPages
    }});
}

export const userUpdatePass = async(req:Request,res:Response) => {
    const {password} = req.body;
    const {id} = req.params;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    await userModel.findByIdAndUpdate(id, {password:hash} , { new: true } );
    return res.status(200).json("Successfuly updated password");
}

export const userUpdateRole = async(req:Request,res:Response) => {
    const {role} = req.body;
    const {id} = req.params;
    await userModel.findByIdAndUpdate(id, {role}, { new: true });
    return res.status(200).json("Successfuly updated role")
}

export const userDelete = async(req:Request,res:Response) => {
    const {id} = req.params;
    await userModel.findByIdAndDelete(id);
    return res.status(201).json({message:"has been removed successfully"})
}