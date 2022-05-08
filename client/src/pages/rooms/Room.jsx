import home4 from '../../assets/home4.jpg'
import home2 from '../../assets/home2.jpg'
import home3 from '../../assets/home3.jpg'
import './room.css'
import Footer from '../../component/footer/Footer'
import Press from '../../component/press/Press'
import Filter from '../../component/filter/Filter'
import { currencyFormatter } from '../../redux/actions/stripe'
import { allDays } from '../../redux/actions/hotel'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';

const Room = ({hotels}) => {
    const navigate = useNavigate();
    const handelHotelDelete = ()=>{
        console.log("hello there");
    }
  return (
      
      <>
        <section className='rooms'>
            <Filter/>
            <pre>{JSON.stringify(hotels,null,4)}</pre>
            {hotels.map((h)=>(
                <div key={h._id}>{h.title}</div>
            ))}
           { hotels.map((h)=>(
           <div className="row" key={h._id}>
                <div className="content">
                    <h3>{h.title}</h3>
                    <p className='location'>
                        <span className='fas fa-location-dot'></span> {h.location}
                    </p>
                    <p>{`${h.content.substring(1,150)}...`}</p>
                    <p className='location'>            
                       Number of bed:  <b>{h.bed}</b>
                    </p>
                    <p className='location'>

                        Available for :<b> {allDays(h.from, h.to)}  {allDays(h.from, h.to) <= 1 ? ' day':' days'}
                    </b>
                    </p>
                    
                    <p className='location'>
                    Available from : <b>{new Date(h.from).toLocaleDateString()}</b>
                    </p>                  

                    <div className="price"><b>
                    {
                    currencyFormatter({
                        amount:h.price,
                        currency:"usd",
                    })}</b> <span>added on: 21st, Dec,2022</span></div>

                    <div className="r-buttons">
                        <a className="btn r-more" onClick={()=>navigate(`/hotel/${h._id}`)} style={{color:'#548CFF'}}>More Info</a>
                        <a className="btn">Book Now</a>
                    </div>
                    <div className="d-flex justify-content-between h1">
                        <Link to={`/hotel/edit/${h._id}`}>
                            <FaEdit className='text-warning'/>
                        </Link>
                        <MdDelete onClick={()=>handelHotelDelete(h._id)}className="text-danger"/>
                    </div>
                </div>
                <div className="image">
                    <img src={h.image} alt={h.image} />
                </div>
            </div>))}
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