import type {Request, Response, NextFunction} from 'express';

const errorMiddleware = (err: Error, _req:Request,res:Response,next:NextFunction) => {    
    return res.status(500).json({
        message:err.message || "internal server error"
    })
}

export default errorMiddleware;