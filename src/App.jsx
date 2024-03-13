import './App.css'
import {BrowserRouter,Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Editor from './Pages/Editor'
import { Toaster } from 'react-hot-toast'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
function App() {

  return (
    <>
      <div>
        <Toaster position='top-center'></Toaster>
      </div>
      <Navbar/>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/editor/:roomId' element={<Editor/> } />
      </Routes>
      </BrowserRouter>
<Footer/>
      </>
  )
}

export default App
