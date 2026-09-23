import {Box, TextField, Button, Typography} from '@mui/material';
import { useState } from 'react';
import type {SiginErrorType} from '../type/Authtype';
import { useNavigate } from 'react-router-dom';

import { signin } from '../api/authApi';
import { useApi } from '../../../shared/hooks/useApi';

import { useDispatch } from 'react-redux';
import { loginSuccess } from '../slice/authSlice';

import signinValidator from '../utilities/signinValidation';

function SigninForm() {

    const [inputVal, setinputVal] = useState({email:"",password:""});
    const [inputErr, setInputErr] = useState<SiginErrorType>({})
    const {execute:signinRequest, load, error} = useApi(signin);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSigninSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const errMsg = signinValidator(inputVal);
        setInputErr(errMsg);
        if(Object.values(errMsg).length === 0){
            const response = await signinRequest(inputVal);
           if(response){
                navigate("/");
                dispatch(loginSuccess({
                    isAuth:true
                }))
           }
        }
    }
    
    const onChangeSignin = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {value,name} = e.target;
        setinputVal(prev => ({...prev, [name]:value}));
    }

  return (
    <>        
        <Typography variant='h4'>Login</Typography>
        {error && error}
        <Box component={"form"} onSubmit={handleSigninSubmit} className='loginFormCanvas'>
            <TextField onChange={onChangeSignin} value={inputVal.email} error={!!inputErr.email} name="email" size='small' type='text' placeholder='email' variant='outlined' label="email"/>
            <Typography color='error'>{inputErr.email}</Typography>
            <TextField onChange={onChangeSignin}  value={inputVal.password} error={!!inputErr.password} name="password" size='small' type='password' placeholder='password' label="password"/>
            <Typography color='error'>{inputErr.password}</Typography>
            <Button type="submit" variant='contained'>{load? "Signing...": "Signin"}</Button>
        </Box>    
    </>
  )
}

export default SigninForm