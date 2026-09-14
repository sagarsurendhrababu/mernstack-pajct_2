import type {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import userModel from '../models/userModel.js';
import {authValidator} from '../utilities/authValidator.js'
import { generateAccessToken, generateRefreshToken } from '../utilities/authTokenGenerator.js';
import jwt, { type JwtPayload } from 'jsonwebtoken';

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
        sameSite:"strict",
        maxAge: 5*60*1000
    }).cookie("refreshtoken",refreshToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge: 30*24*60*60*1000
    }).status(200).json({message:"Successfully login"})
}

//signout
export const signoutControler = async (_req:Request,res:Response) => {
    res.clearCookie("accesstoken",{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:'strict',
        maxAge: 5*60*1000
    }).clearCookie("redreshtoken",{
        httpOnly:true,
        secure:process.env.NODE_ENV === 'production',
        sameSite:'strict',
        maxAge: 30*24*60*60*1000
    }).status(200).json({message:'Successfuly signout'})
} 

//me controller
export const meControl = async(req:Request,res:Response) => {
    const response = await userModel.findById(req.user.id).select("-password");
    res.status(200).json({response})
}

//refresh controller
export const refreshCOntroler = (req:Request,res:Response) => {
    const refreshToken = req.cookies.refreshtoken;
    if(!refreshToken){
        return res.status(404).json({message:"The refreshtoken not found"});
    }
    const decode = jwt.verify(refreshToken, process.env.SECURE_REFRESH as string) as JwtPayload;
    if(!decode) {
        return res.status(401).json({message:"refreshtoken not valid"})
    }
    const accessToken = generateAccessToken(decode.id);
    res.cookie('accesstoken', accessToken, {
        httpOnly:true,
        secure: process.env.DEV_ENV === 'production',
        sameSite:'strict',
        maxAge: 5*60*1000
    }).status(200).json({message:"refreshToken generated"})
}