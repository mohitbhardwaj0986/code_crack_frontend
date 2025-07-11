import React from 'react'
import MainRoutes from './components/MainRoutes'
import Footer from "./components/Footer"
import Nav from './components/Nav'
function App() {
  
  return (
     <div className='text-white bg-black'>
     <Nav/>
     <MainRoutes/>
     <Footer/>
    </div>
  )
}

export default App