import type {Request,Response,NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authMiddleware = (req:Request,res:Response,next:NextFunction) => {
    try{           
        const accessToken = req.cookies.accesstoken;
        if(!accessToken){
            return res.status(401).json({message:"Not Autheticated"})
        }
        const decode = jwt.verify(accessToken, process.env.SECURE_ACCESS as string);
        req.user = decode;
        next();
    }catch(err){
        return res.status(401).json({message: "Invalid or expired AccessToken" })
    }
}

export default authMiddleware;