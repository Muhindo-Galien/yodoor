import React from 'react'
import About from '../about/About'
import Blog from '../blog/Blog'
import Contact from '../contact/Contact'
import Featured from '../featured/Featured'
import Footer from '../footer/Footer'

import Hero from '../hero/Hero'
import Press from '../press/Press'

const Home = () => {
  return (
    <div >
      <Hero/>
      <About/>
      <Featured/>
      <Contact/>
      <Blog/>
      <Press/>
      <Footer/>
      
    </div>
  )
}

export default Home