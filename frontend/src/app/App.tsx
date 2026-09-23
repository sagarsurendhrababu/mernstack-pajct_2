
import { Suspense, lazy } from 'react';
import {Routes, Route} from 'react-router-dom';
import PublicLayout from '../shared/components/layout/PublicLayout';
import PrivateLayout from '../shared/components/layout/PrivateLayout';
import Skelton from '../shared/components/layout/Skelton';

const Signin = lazy(() => import('../features/auth/pages/Signin'));
const Signup = lazy(() => import('../features/auth/pages/Signup'));
const Home = lazy(() => import('../features/dashboard/Home'));
const About = lazy(() => import('../features/about/page/about'));
const Users = lazy(() => import('../features/users/page/Users'))
const PageNotFound = lazy(() => import('../shared/components/PageNotFound'));

function App() {  
  return (
    <Suspense fallback={<Skelton/>}>
    <Routes>
      <Route element={<PublicLayout/>}>
        <Route path='/signin' element={<Signin/>}/>
        <Route path='/signup' element={<Signup/>}/>        
      </Route>
      <Route element={<PrivateLayout/>}>
        <Route path='/' element={<Home/>}/> 
        <Route path='/about' element={<About/>}/>  
        <Route path='/users' element={<Users/>}/>        
      </Route>  
      <Route path='*' element={<PageNotFound/>}/>
    </Routes>
    </Suspense>
  )
}

export default App
