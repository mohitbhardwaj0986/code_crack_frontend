import React from 'react'
import MainRoutes from './components/MainRoutes'
import Footer from "./components/Footer"
import Nav from './components/Nav'
import { Toaster } from 'sonner'
function App() {
  
  return (
     <div className='text-white bg-black'>
     <Nav/>
     <MainRoutes className="overflow-hidden"/>
     <Footer/>
       <Toaster richColors position="bottom-right" />
    </div>
  )
}

export default App