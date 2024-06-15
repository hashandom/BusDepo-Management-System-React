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
export default function App() {
  return (
    
 <>
  <BrowserRouter>
    <Routes>
        <Route path='/login' element={<LoginControl/>}></Route>
        <Route path='/forgetpassword' element={<ForgetPassword/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>

        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path='/user' element={<User />}></Route>
        <Route path='/employee' element={<Employee />}></Route>
        <Route path='/busroute' element={<BusRoute/>}></Route>
        <Route path='/Vehicle' element={<Vehicle />}></Route>
        <Route path='/TripRecords' element={<TripRecord />}></Route>

        <Route path='/manage/employees' element={<ManageEmployees/>}></Route>
    </Routes>
  </BrowserRouter>
 </>
  );
}
