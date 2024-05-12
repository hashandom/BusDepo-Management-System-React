import React from 'react'
import {Routes,Route,BrowserRouter} from "react-router-dom"
import Dashboard from './Page/Dashboard'
import User from './Page/User'
import Employee from './Page/Employee'
import BusRoute from './Page/BusRoute'
import Vehicle from './Page/Vehicle'
import TripRecord from './Page/TripRecords'
export default function App() {
  return (
 <>
  <BrowserRouter>
    <Routes>
        <Route path='/' element={<Dashboard />}></Route>
        <Route path='/user' element={<User />}></Route>
        <Route path='/employee' element={<Employee />}></Route>
        <Route path='/busroute' element={<BusRoute/>}></Route>
        <Route path='/Vehicle' element={<Vehicle />}></Route>
        <Route path='/TripRecords' element={<TripRecord />}></Route>
    </Routes>
  </BrowserRouter>
 </>
  )
}
