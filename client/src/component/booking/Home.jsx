import React from 'react'
import About from '../about/About'
import Contact from '../contact/Contact'
import Featured from '../featured/Featured'

import Hero from '../hero/Hero'

const Home = () => {
  return (
    <div >
      <Hero/>
      <About/>
      <Featured/>
      <Contact/>
    </div>
  )
}

export default Home