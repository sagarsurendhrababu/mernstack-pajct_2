import { Outlet } from 'react-router-dom';
import {Box,Container} from '@mui/material';
import { Navigate } from 'react-router-dom';

import Header from '../Header';
import Footer from '../Footer';
import Skelton from './Skelton';

import { useSelector } from 'react-redux';
import type { RootState } from '../../../app/store/store';

function PublicLayout() {
  const {isAuth, isLoading} = useSelector((state:RootState) => state.auth);

  if(isLoading){
    return (<h2>Loading...</h2>)
  }

  if(isAuth){
    return <Navigate to="/" replace/>
  }

  return (
    <>
      <Header/>
      <Box component={"section"} className='bodyContent'>
          <Container maxWidth="xl">
            <Box component={"section"} sx={{display:"flex", justifyContent:"center", alignItems:"center", height:"100%"}}>
              <Outlet/>
            </Box>            
          </Container>
      </Box>
      <Footer/>    
    </>    
  )
}

export default PublicLayout