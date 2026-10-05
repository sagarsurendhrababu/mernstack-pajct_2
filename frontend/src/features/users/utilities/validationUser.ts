import validator from 'validator';

function validationUser(value:{email:string,password:string}):{email?:string,password?:string} {

    const errMsg:{email?:string, password?:string} = {}

    const {email,password} = value;

    if(validator.isEmpty(email)){
        errMsg.email = "This Email field is empty";
    }else if(!validator.isEmail(email)){
        errMsg.email = "This Email is Invalid";
    }
    if(validator.isEmpty(password)){
        errMsg.email = "This password field is empty";
    }else if(!validator.isStrongPassword(password)){
        errMsg.email = "This password is Invalid";
    } 

    return errMsg;   
}

export default validationUser