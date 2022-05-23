import home4 from '../../assets/home4.jpg'
import home2 from '../../assets/home2.jpg'
import home3 from '../../assets/home3.jpg'
import './room.css'
import Footer from '../../component/footer/Footer'
import Press from '../../component/press/Press'
import Filter from '../../component/filter/Filter'
import { currencyFormatter } from '../../redux/actions/stripe'
import { allDays, allHotelRooms } from '../../redux/actions/hotel'
import { Link, useNavigate } from 'react-router-dom'
import { FaEdit } from 'react-icons/fa';
import { MdDelete } from 'react-icons/md';
import SamllCard from '../../component/card/samllcard/SamllCard'
import { useEffect, useState } from 'react'
import Search from '../../component/forms/Search'

const Room = () => {
    const [hotels,setHotels] = useState([])

    useEffect(()=>{
      loadAllHotels()
    },[])
  
    const loadAllHotels = async() =>{
      let res = await allHotelRooms();
      setHotels(res.data);
    }

  return (
      
      <>
        <section className='rooms'>
            <Filter/>
            
            <pre>{JSON.stringify(hotels,null,4)}</pre>
           {hotels && hotels.map((h)=><SamllCard key={h._id} h={h}/>)}
    
        </section>
        <Press/>
        <Footer/>
      </>
    
  )
}

export default Room