import React from 'react'
import SideBar from '../Component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import EmployeeTable from '../EmployeeTable/EmployeeTable'

export default function Settings() {
  return (
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
            <Typography variant="h5">
             Employee Details
            </Typography>
          <EmployeeTable/>
          </Box>
    </Box>
  )
}
