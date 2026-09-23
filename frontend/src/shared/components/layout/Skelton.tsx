import {Box} from '@mui/material'

function Skelton() {
  return (
    <>
        <Box sx={{width:'100%', height:'60px', background:'#f9fd11'}}>Header</Box>
        <Box sx={{height:'calc(100vh - 120px)'}}>content</Box>
        <Box sx={{width:'100%', height:'60px', background:'#1aac68'}}>footer</Box>
    </>
  )
}

export default Skelton