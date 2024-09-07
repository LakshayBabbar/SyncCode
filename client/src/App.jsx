import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Components/Home'
import picture from './assets/Pictures/image.jpg'

const App = () => {
  return (
    <div className='w-full min-h-screen' style={{
      backgroundImage: `url(${picture})`,
      backgroundPosition: "center",
      backgroundSize: "cover",
   
    }}>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/room'></Route>
        <Route path='/lobby'></Route>
      </Routes>
    </div>
  )
}

export default App