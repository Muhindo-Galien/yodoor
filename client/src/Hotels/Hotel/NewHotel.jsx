import React from 'react'
import { useSelector } from 'react-redux'
import "./newhotel.css"

const NewHotel = () => {
    const {auth} = useSelector((state)=>({...state}))
  return (
    <div className='hotel'>
        <h1>Post a Hotel</h1>
        <p>{JSON.stringify(auth)}</p>
    </div>
  )
}

export default NewHotel