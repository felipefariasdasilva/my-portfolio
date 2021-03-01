import React from 'react'
import TheHeader from './components/header/TheHeader'
import './App.css'
import Routes from './Routes'

function App() {

  return (
   
    <div className='container' >

      <div className='header'>
        <TheHeader/>
      </div>

      <div className='body'>
        <Routes/>
      </div>

    </div>
  )

}

export default App;
