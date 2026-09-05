import validator from 'validator';
import type { AuthParams } from '../types/type.js';

export const authValidator = ({email,password}:AuthParams) => {
    if(!email || validator.isEmpty(email.trim())){
        throw new Error("Email is empty");
    }else if(!validator.isEmail(email)){
        throw new Error("Email id invalid")
    }
    if(!password || validator.isEmpty(password)){
        throw new Error("Password is empty")
    }else if(!validator.isStrongPassword(password)){
        throw new Error("Password not strong")
    }
}
