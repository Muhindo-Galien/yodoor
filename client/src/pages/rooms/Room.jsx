import home4 from '../../assets/home4.jpg'
import home2 from '../../assets/home2.jpg'
import home3 from '../../assets/home3.jpg'
import './room.css'
import Footer from '../../component/footer/Footer'
import Press from '../../component/press/Press'

const Room = () => {
  return (
      <>
        <section className='rooms'>
            <div className="row">
                <div className="content">
                    <h3>Linda Hotel</h3>
                    <p className='location'>
                        <span className='fas fa-location-dot'></span> Goma/border/plot 245
                    </p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis perspiciatis maxime alias voluptate laborum consectetur unde. Aliquam sequi perspiciatis doloribus blanditiis dolorem laudantium eaque vitae nostrum culpa voluptates? Eveniet, excepturi.</p>

                    <div className="price"><b>$20.99</b> <span>added on: 21st, Dec,2022</span></div>

                    <div className="r-buttons">
                        <a className="btn r-more" style={{color:'#548CFF'}}>More Info</a>
                        <a className="btn">Book Now</a>
                    </div>
                </div>
                <div className="image">
                    <img src={home4} alt="home4" />
                </div>
            </div>
            <div className="row">
                <div className="content">
                    <h3>Hius Hotel</h3>
                    <p className='location'>
                        <span className='fas fa-location-dot'></span> Goma/border/plot 245
                    </p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis perspiciatis maxime alias voluptate laborum consectetur unde. Aliquam sequi perspiciatis doloribus blanditiis dolorem laudantium eaque vitae nostrum culpa voluptates? Eveniet, excepturi.</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis perspiciatis maxime alias voluptate laborum consectetur unde. Aliquam sequi perspiciatis doloribus blanditiis dolorem laudantium eaque vitae nostrum culpa voluptates? Eveniet, excepturi.</p>

                    <div className="price"><b>$35.99</b> <span>added on: 21st, Dec,2022</span></div>

                    <div className="r-buttons">
                        <a className="btn r-more" style={{color:'#548CFF'}}>More Info</a>
                        <a className="btn">Book Now</a>
                    </div>
                </div>
                <div className="image">
                    <img src={home2} alt="home1" />
                </div>
            </div>

            <div className="row">
                <div className="content">
                    <h3>La joie plazza</h3>
                    <p className='location'>
                        <span className='fas fa-location-dot'></span> Goma/border/plot 245
                    </p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis perspiciatis maxime alias voluptate laborum consectetur unde. Aliquam sequi perspiciatis doloribus blanditiis dolorem laudantium eaque vitae nostrum culpa voluptates? Eveniet, excepturi.</p>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officiis perspiciatis maxime alias voluptate laborum consectetur unde. Aliquam sequi perspiciatis doloribus blanditiis dolorem laudantium eaque vitae nostrum culpa voluptates? Eveniet, excepturi.</p>

                    <div className="price"><b>$59.99</b> <span>added on: 21st, Dec,2022</span></div>

                    <div className="r-buttons">
                        <a className="btn r-more" style={{color:'#548CFF'}}>More Info</a>
                        <a className="btn">Book Now</a>
                    </div>
                </div>
                <div className="image">
                    <img src={home3} alt="home1" />
                </div>
            </div>
        </section>
        <Press/>
        <Footer/>
      </>
    
  )
}

export default Room