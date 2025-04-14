import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home'
import Navbar from './page/Navbar'
import CreateCase from './page/CreateCase'
import ViewCase from './page/ViewCase'
import ResolveCase from './page/ResolveCase'
import Footer from './page/Footer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/create-case' element={<CreateCase></CreateCase>}></Route>
        <Route path='/view-case' element={<ViewCase></ViewCase>}></Route>
        <Route path='/resolve-case' element={<ResolveCase></ResolveCase>}></Route>
      </Routes>
      <Footer></Footer>
    </BrowserRouter>
  )
}

export default App
