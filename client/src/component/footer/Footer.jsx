import React from 'react'
import './footer.css'


const Footer = () => {
  return (
    <section className='footer'>
        <div className="share">
            <a href="#" className='fab fa-facebook'></a>
            <a href="#" className='fab fa-facebook'></a>
            <a href="#" className='fab fa-facebook'></a>
            <a href="#" className='fab fa-facebook'></a>
        </div>
        <div className="links">
            <a href="#">Home</a>
            <a href="#">Rooms</a>
            <a href="#">Blog</a>
            <a href="#">About</a>
            <a href="#">Contact</a>
        </div>
        <div className="credit"> created by <span>Muhindo Galien</span> | All rights reserved</div>
    </section>
  )
}

export default Footer