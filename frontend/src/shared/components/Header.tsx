import {Box,Container,Button, Typography} from '@mui/material';
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux';
import type { RootState } from '../../app/store/store';
import { useApi } from '../hooks/useApi';
import {signout} from '../../features/auth/api/authApi'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {signoutAction} from '../../features/auth/slice/authSlice'

function Header() {
    const {isAuth,user} = useSelector((state:RootState) => state.auth);

    const {execute} = useApi(signout);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignout = async () => {
        const response = await execute();
            if(response){                
                dispatch(signoutAction());
                navigate("/signin");
            }    
    }

  return (
      <Box component={"header"}>
          <Container maxWidth="xl" sx={{display:"flex", alignItems:"center", height:"100%"}}>
                <Box sx={{display:"flex", width:"100%", height:'100%'}}>
                    <Box className={"logo"}>Logo</Box>
                    <Box className={"nav"} sx={{gap:1}}>
                        {isAuth? (
                        <>
                            <Typography variant="body1" color="initial">{user?.email}</Typography>
                            <Button size="small" component={Link} to="/">Home</Button>
                            <Button size="small" component={Link} to="/about">About</Button>
                            <Button size="small" component={Link} to="/users">Users</Button>
                            <Button size="small" onClick={handleSignout}>Signout</Button>                    
                        </>
                        ): (
                        <>
                            <Button size="small" variant="contained" component={Link} to="/signin">Signin</Button>
                            <Button size="small" variant="outlined" component={Link} to="/signup">Create Account</Button>                   
                        </>
                        )}                       
                    </Box>                    
                </Box>
          </Container>
      </Box>    
  )
}

export default Header