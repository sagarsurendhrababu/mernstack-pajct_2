import { useEffect } from 'react';
import { useApi } from '../hooks/useApi';
import {me} from '../../features/auth/api/authApi';
import type {RootState} from '../../app/store/store'

import { useDispatch, useSelector } from 'react-redux';
import {loginSuccess,signoutAction} from '../../features/auth/slice/authSlice';

function AuthUtilizer() {

  const {execute:getMe} = useApi(me);
  const isAuth = useSelector((state:RootState) => state.auth.isAuth);
  const dispatch = useDispatch()

  useEffect(() => {
    async function fetchMe(){
        const response = await getMe();
        if(response){
          dispatch(loginSuccess(response));
        }else{
          dispatch(signoutAction());
        }
    }
    fetchMe();
  },[getMe,isAuth,dispatch])

  return (
    <></>
  )
}

export default AuthUtilizer