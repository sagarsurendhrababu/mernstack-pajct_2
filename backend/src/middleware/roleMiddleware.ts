import type {Response, Request, NextFunction} from 'express';
import userModel from '../models/userModel.js';

const roleMiddleware = (roles:string[]) => {
    return async  (req:Request,res:Response,next:NextFunction) => {
    const user = await userModel.findById(req.user.id);
    if(!user){
        return res.status(403).json({messagae:"Autharization Error"})
    }
    if(!roles.includes(user.role)){
       return res.status(403).json({message:"Forbidden: insufficient permissions"})
    }
    next();
    }
}

export default roleMiddleware;