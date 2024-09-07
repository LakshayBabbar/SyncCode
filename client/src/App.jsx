import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Home from './Components/Home'

const App = () => {
  return (
    <div className='w-full h-screen bg-gradient-to-r from-slate-400 to-violet-900'>
      <Routes>
        <Route path='/' element={<Home/>} ></Route>
        <Route path='/room'></Route>
        <Route path='/lobby'></Route>
      </Routes>
    </div>
  )
}

export default App