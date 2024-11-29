import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import rata from './assets/rata.jpg'


function ImgView(){

  function click(e: React.MouseEvent<HTMLImageElement, MouseEvent>){
    console.log(e.target)
  }
  return (
    <img onClick={click} src={rata} alt="" />
  )
}

export default function App() {

  return (
    <>
    <div className='form-subida'>
      <form action="post">
        <label htmlFor={'imagen'}>Subir Imagenes</label>
        <input name='imagen' id='imagen' type="file" accept="image/png, image/jpeg" />
      </form>
    </div>
      <div className='boxImg'>
        <ImgView/>
      </div>
    </>
  )
}

