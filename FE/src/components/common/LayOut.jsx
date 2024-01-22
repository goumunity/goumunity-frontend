import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import CustomModal from './CustomModal';
import JoinModal from '../../modal/JoinModal1';
import LoginModal from '../../modal/LoginModal';
import LandingPage from '../../pages/LandingPage';

function LayOut() {

  
  return (
    <div className='flex bg-bg bg-opacity-10'>
      <NavBar />
      <Outlet />
    </div>
  );
}

export default LayOut;
