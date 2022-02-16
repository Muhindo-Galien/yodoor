import React from 'react'
import { Link } from 'react-router-dom'
import './footer.css'


const Footer = () => {
  return (
    <section className='footer'>
        <div className="share">
            <a href="https://www.linkedin.com/in/muhindo-galien-292902213/" className='fab fa-facebook'></a>
            <a href="https://www.linkedin.com/in/muhindo-galien-292902213/" className='fab fa-facebook'></a>
            <a href="https://www.linkedin.com/in/muhindo-galien-292902213/" className='fab fa-facebook'></a>
            <a href="https://www.linkedin.com/in/muhindo-galien-292902213/" className='fab fa-facebook'></a>
        </div>
        <div className="links">
          <Link to='/'>
            <a>Home</a>
          </Link>
          <Link to='/rooms'>
            <a>Rooms</a>
          </Link>
          <Link to='/blog'>
            <a>Blog</a>
          </Link>
          <Link to='/about'>
            <a>About</a>
          </Link>
          <Link to='/contact'>
            <a>Contact</a>
          </Link>
        </div>
        <div className="credit"> created by <span>Muhindo Galien</span> | All rights reserved</div>
    </section>
  )
}

export default Footer