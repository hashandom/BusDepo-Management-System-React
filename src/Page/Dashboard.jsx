import React from 'react'
import SideBar from '../Component/SideBar'
import Box from '@mui/material/Box';
import MediaCard from '../Component/MediaCard';
import FlexBoxDesign from '../Component/FlexboxDesign'
export default function Dashboard() {
  return (
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box
  component="main"
  sx={{ flexGrow: 1, p: 3,marginRight:"5px", marginTop: "55px", display: "flex", justifyContent: "space-around" }}
>
  <FlexBoxDesign/>
</Box>

    </Box>
  )
}
