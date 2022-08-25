import React, { useEffect, useState } from 'react'
import home2 from '../../assets/home2.jpg';
import './featured.css'
import { allHotelRooms } from '../../redux/actions/hotel';
import { useNavigate } from 'react-router-dom';


const Featured = () => {
    const [hotels,setHotels] = useState([])
    const navigate = useNavigate()
    useEffect(()=>{
      loadAllHotels()
    },[])
  
    const loadAllHotels = async() =>{
      let res = await allHotelRooms();
      setHotels(res.data.slice(0, 3));
    }
    console.log("hotels from featured",hotels);
  return (
    <section className='featured'>
        
        <h1 className="heading">Featured <span>Rooms</span></h1>

        <div className="box-container">
           {hotels.map((h)=>(
               <div className="box" key={h._id}>
               <div className="image">
                   <img src={home2} alt="home" />
               </div>
               <div className="content">
                   <h3>{h.title}</h3>
                   <p>{`${h.content.substring(1,50)}...`}</p>
               <div className="buttons">
                    <a className="btn more" onClick={()=>navigate(`/hotel/${h._id}`)} style={{color:'#548CFF'}}>More Info</a>
                    <a className="btn">Book Now</a>
               </div>

               </div>
           </div>
           )) }
            {/* <div className="box">
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
            </div> */}
            {/* <div className="box">
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
            </div> */}
            

        </div>
        
    </section>
  )
}

export default Featured