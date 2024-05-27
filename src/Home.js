import React from 'react';
import Heading from './Heading';
import SideBar from './SideBar';
import MainContent from './MainContent';
import { AppProvider } from './AppContext';

function Home() {
  return (
    <div>
      <Heading /> 
      <AppProvider>
        <SideBar/>
        <MainContent/>
      </AppProvider>
      
    </div>
  )
}

export default Home

