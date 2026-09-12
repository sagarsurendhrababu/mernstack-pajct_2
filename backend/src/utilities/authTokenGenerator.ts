import jwt from 'jsonwebtoken';

export const generateAccessToken = (id:string) => {
    return jwt.sign({id},process.env.SECURE_ACCESS as string,{expiresIn:'5m'})
}

export const generateRefreshToken = (id:string) => {
    return jwt.sign({id},process.env.SECURE_REFRESH as string,{expiresIn:'30d'})
}