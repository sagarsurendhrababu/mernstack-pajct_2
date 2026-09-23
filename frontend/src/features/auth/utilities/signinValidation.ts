import validator from 'validator'
import type {SiginErrorType} from "../type/Authtype";

const signinValidator = (value:{email:string,password:string}):SiginErrorType => {
    const errorMsg:SiginErrorType = {}
    if(validator.isEmpty(value.email)){
        errorMsg.email = "Email Field is Empty";
    }else if(!validator.isEmail(value.email)){
        errorMsg.email = "Email is not Validator"
    }
    if(validator.isEmpty(value.password)){
        errorMsg.password = "Password Field is Empty";
    }else if(!validator.isStrongPassword(value.password)){
        errorMsg.password = "Password is not strong"
    }
    return errorMsg;
}

export default signinValidator;