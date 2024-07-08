import React from 'react'
import {Routes,Route,BrowserRouter} from "react-router-dom"
import Dashboard from './Page/Dashboard'
import User from './Page/User'
import Employee from './Page/Employee'
import BusRoute from './Page/BusRoute'
import Vehicle from './Page/Vehicle'
import TripRecord from './Page/TripRecords'
import LoginControl from './Page/LoginControl'
import Signup from './LoginControl/signup'
import ForgetPassword from './Page/ForgetPassword'

import ManageEmployees from './Page/Management/Employees/Employees'
import ManageConductors from './Page/Management/Conductors/Conductors'
import ManageDrivers from './Page/Management/Drivers/Drivers'
import ManageRoutes from './Page/Management/Routes/Routes'
import ManageTrips from './Page/Management/Trips/Trips'
import Login from './Page/Login/Login'
import PerformanceReportRoute from './Page/Reports/PerfromanceReportRoute'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function App() {
  return (
    
 <>
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <BrowserRouter>
      <Routes>
          <Route path='/login' element={<Login/>}></Route>
          {/* <Route path='/forgetpassword' element={<ForgetPassword/>}></Route>
          <Route path='/signup' element={<Signup/>}></Route> */}

          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/dashboard' element={<Dashboard />}></Route>
          <Route path='/user' element={<User />}></Route>
          <Route path='/employee' element={<Employee />}></Route>
          <Route path='/busroute' element={<BusRoute/>}></Route>
          <Route path='/Vehicle' element={<Vehicle />}></Route>
          <Route path='/TripRecords' element={<TripRecord />}></Route>

          <Route path='/manage/employees' element={<ManageEmployees/>}></Route>
          <Route path='/manage/conductors' element={<ManageConductors/>}></Route>
          <Route path='/manage/drivers' element={<ManageDrivers/>}></Route>
          <Route path='/manage/routes' element={<ManageRoutes/>}></Route>
          <Route path='/manage/trips' element={<ManageTrips/>}></Route>

          <Route path='/report/route' element={<PerformanceReportRoute />}></Route>


      </Routes>
    </BrowserRouter>
  </LocalizationProvider>
  
 </>
  );
}
