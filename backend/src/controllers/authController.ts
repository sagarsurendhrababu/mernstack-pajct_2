import type {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import {authValidator} from '../utilities/authValidator.js'
import { generateAccessToken, generateRefreshToken } from '../utilities/authTokenGenerator.js';

//signup controller
export const signupControler = async (req:Request,res:Response) => {
    const {email,password} = req.body;
    authValidator({email,password})
    const existUser = await userModel.findOne({email});
    if(existUser){
        return res.status(400).json({message:"User Already exist"});
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password,salt);
    
    const response = await userModel.create({email,password:hash});
    const accessToken = generateAccessToken(response._id.toString());
    const refreshToken = generateRefreshToken(response._id.toString()); 
            
    return res.cookie("accesstoken",accessToken,{
        httpOnly: true,
        secure:true,
        sameSite:"strict"
    }).cookie("refreshtoken",refreshToken,{
        httpOnly:true,
        secure:true,
        sameSite:"strict"
    }).status(201).json({message:"Successfuly Create New Account"});  
}

//signin controller
export const signinControler = async (req:Request,res:Response) => {
    const {email,password} = req.body;
    const isExistUser = await userModel.findOne({email});
    if(!isExistUser){
        return res.status(404).json({message:"The user is not exist please create new account"})
    }
    const chckPass = await bcrypt.compare(password, isExistUser!.password);
    if(!chckPass){
        return res.status(400).json({message:"incorect password"});
    }
    const accessToken = generateAccessToken(isExistUser!._id.toString());
    const refreshToken = generateRefreshToken(isExistUser!._id.toString()); 
            
    return res.cookie("accesstoken",accessToken,{
        httpOnly: true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict"
    }).cookie("refreshtoken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict"
    }).status(200).json({message:"Successfully login"})
}

//signout
export const signoutControler = async (_req:Request,res:Response) => {
    res.clearCookie("accesstoken",{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:'strict'
    }).clearCookie("redreshtoken",{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:'strict'
    }).status(200).json({message:'Successfuly signout'})

}