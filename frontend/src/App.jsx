import React from 'react';
import { BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import {Signin} from '../src/pages/Signin';
import {Signup} from '../src/pages/Signup';
import {Dashboard} from '../src/pages/Dashboard';
import {SendMoney} from '../src/pages/SendMoney';





function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/dashboard' element={<Dashboard/>}/>
      <Route path='/send' element={<SendMoney/>}/>
      <Route path='/' element={<Navigate to="/signup" />} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
