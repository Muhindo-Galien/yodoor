import React from 'react'
import home2 from '../../assets/home2.jpg';
import home6 from '../../assets/home6.jpg';
import home1 from '../../assets/home1.jpg';
import './featured.css'


const Featured = () => {
  return (
    <section className='featured'>
        <h1 className="heading">Featured <span>Rooms</span></h1>

        <div className="box-container">
            <div className="box">
                <div className="image">
                    <img src={home2} alt="home" />
                </div>
                <div className="content">
                    <h3>Galien killer</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, sapiente!</p>
                <div className="buttons">
                <a className="btn more" >More Info</a>
                <a className="btn">Book Now</a>
                </div>

                </div>
            </div>
            <div className="box">
                <div className="image">
                    <img src={home6} alt="home" />
                </div>
                <div className="content">
                    <h3>Galien killer</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, sapiente!</p>
                    <div className="buttons">
                        <a className="btn more" >More Info</a>
                        <a className="btn">Book Now</a>
                    </div>

                </div>
            </div>
            <div className="box">
                <div className="image">
                    <img src={home1} alt="home" />
                </div>
                <div className="content">
                    <h3>Galien killer</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, sapiente!</p>
                    <div className="buttons">
                        <a className="btn more" >More Info</a>
                        <a className="btn">Book Now</a>
                    </div>
                </div>
            </div>
            

        </div>
        
    </section>
  )
}

export default Featured