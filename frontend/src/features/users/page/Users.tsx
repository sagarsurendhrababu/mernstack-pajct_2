import {Box, Typography} from '@mui/material'
import {useApi} from '../../../shared/hooks/useApi';
import { allUser } from '../api/userApi';
import { lazy, Suspense, useEffect, useState} from 'react';
import UserTable from '../Components/UserTable';

const AddUser = lazy(() => import('../Components/AddUser'));
export interface UserResponse {
  _id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}
export interface UserPagination{
  hasNextPage:boolean;
  page:number;
  totalPages:number;
  totalUsers:number
}

function Users() {

  const {execute, load} = useApi<void,{pagination:UserPagination,response:UserResponse[]}>(allUser);   
  const [data,setData] = useState<{pagination:UserPagination, response:UserResponse[]} | null>(null);

  useEffect(() => {
      const controller = new AbortController();
      async function fetchUsers(){
        const response = await execute(undefined, controller.signal);
        if(response){
          setData(response);
        }
      }
      fetchUsers();
      return () => {
        controller.abort();
      }
  },[execute]);

  const handleUserNewAdded = (newUser:UserResponse) => {    
    setData(prev => {
      if (!prev) return prev;
        return {
          ...prev,
          response: [newUser, ...prev.response]
        };
    })
  }

  return (
    <Suspense fallback={<h4>Loading...</h4>}>
      {load && <Typography variant='body1'>Loading...</Typography>}
      <Box sx={{ width: '100%' }}>
        <AddUser handleUserNewAdded={handleUserNewAdded}/>                  
        <UserTable data={data}/>
      </Box>
    </Suspense>
  )
}


export default Users