import React from 'react'
import About from '../component/about/About'
import Blog from '../component/blog/Blog'
import Contact from '../component/contact/Contact'
import Featured from '../component/featured/Featured'
import Footer from '../component/footer/Footer'

import Hero from '../component/hero/Hero'
import Press from '../component/press/Press'

const Home = () => {

  return (
    <div >
      <Hero/>
      <About/>
      <Featured/>
      <Contact/>
      {/* <Blog/> */}
      <Press/>
      <Footer/>
    </div>
  )
}

export default Home