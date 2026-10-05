import {Button, Dialog, DialogContent, Box, DialogActions, TextField, Typography} from '@mui/material'
import { useState } from 'react'
import validationUser from '../utilities/validationUser';
import { useApi } from '../../../shared/hooks/useApi';
import {createUser} from '../api/userApi'

interface ResponseCreateType{
  _id: string;
  email: string;
  role: string;
  createdAt: string;
  updatedAt: string;
}

interface InputData{
    email:string,
    password:string
}

function AddUser({handleUserNewAdded }: {handleUserNewAdded: (user: ResponseCreateType) => void;}) {

    const [open,setOpen] =  useState(false);
    const [err, serErr] = useState<{email?:string,password?:string}>({})
    const [value, setValue] = useState<{email:string,password:string}>({email:"",password:""});

    const {execute} = useApi<InputData, ResponseCreateType>(createUser)

    const handleSubmit = async (e:React.SubmitEvent<HTMLFormElement>) => {        
        e.preventDefault();
        const errMsg = validationUser(value);
        serErr(errMsg);
        if(Object.values(errMsg).length === 0){            
            const response = await execute(value);  
            if(response){
                handleUserNewAdded(response);
                setValue({email:"",password:""});
                setOpen(!open)
            }

        }
    }

    const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target;
        setValue(prev => ({...prev, [name] : value}));
    }

  return (
    <>
        <Button size='small' variant='contained' onClick={() => setOpen(!open)}>Add</Button>
        <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby={"create-user"} fullWidth>
        <Box sx={{display:"flex", 
            justifyContent:"space-between", 
            height:"40px", 
            alignItems:'center', 
            padding:"0 0 0 20px",                    
            }}>
            <Typography variant='body1'>
                Create New User
            </Typography>
            <DialogActions>
            <Button
                size='small'
                variant='text'
                onClick={() => setOpen(!open)}
                color="primary"
            >
                Cancel
            </Button>
            </DialogActions>            
        </Box>          
          <DialogContent>
                <Box component={"form"} sx={{display:"flex", flexDirection:"column", gap:2}} onSubmit={handleSubmit}>
                    <TextField 
                        type='text' 
                        size='small' 
                        placeholder='email' 
                        label={"Email"}
                        onChange={handleChange}
                        name="email"
                        error={!!err.email}
                        helperText={err.email}
                        value={value.email}
                        />
                       
                    <TextField 
                        type='password' size='small' 
                        onChange={handleChange} 
                        name="password" placeholder='password' 
                        error={!!err.password}
                        helperText={err.password}
                        label={"Password"}
                        value={value.password}
                        />
                      
                    <Button type='submit' variant='contained'>Create User</Button>
                </Box>
          </DialogContent>
        </Dialog>
    </>
  )
}

export default AddUser