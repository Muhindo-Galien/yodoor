import React from 'react'
import { useSelector } from 'react-redux'
import About from '../component/about/About'
import Blog from '../component/blog/Blog'
import Contact from '../component/contact/Contact'
import Featured from '../component/featured/Featured'
import Footer from '../component/footer/Footer'

import Hero from '../component/hero/Hero'
import Press from '../component/press/Press'

const Home = () => {
  const {user} =useSelector((state)=>({...state}));

  return (
    <div >
      <Hero/>
      <About/>
      <Featured/>
      <Contact/>
      <Blog/>
      <Press/>
      <Footer/>
      <p style={{color:"red"}}>{JSON.stringify(user)}</p>
      <p style={{color:"red"}}>{JSON.stringify(user)}</p>
    </div>
  )
}

export default Home