import {Box,Container} from '@mui/material';
import { Navigate, Outlet } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';

import { useSelector } from 'react-redux';
import type {RootState} from '../../../app/store/store';

function PrivateLayout() {

  const {isAuth,isLoading} = useSelector((state:RootState) => state.auth);

  if(isLoading){
    return (<h2>Loading...</h2>)
  }

  if (!isAuth) {
    return <Navigate to="/signin" replace />;
  }


  return (
    <>
      <Header/>
      <Box component={"section"} className='bodyContent'>
          <Container maxWidth="xl">
              <Box sx={{width:"100%",display:"flex", height:"100%"}}>
                <Box component={"aside"} sx={{width:{xs:"60px",md:"20%"}}}>aside</Box>
                <Box component={"section"}><Outlet/></Box>                
              </Box>          
          </Container>
      </Box> 
      <Footer/>    
    </>    
  )
}

export default PrivateLayout