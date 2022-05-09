import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import ConnectNav from '../../component/connectNav/ConnectNav'
import SmallCard from '../../pages/rooms/samllcard/SamllCard'
import DashboardNav from '../../component/dashboardnav/DashboardNav'
import "./dashboard_seller.css"
import { ImHome } from 'react-icons/im';
import { useAlert } from 'react-alert'
import { createConnectAccount } from '../../redux/actions/stripe'
import { deleteHotel, sellerHotels } from '../../redux/actions/hotel'

const DashboardSeller = () => {

  const alert = useAlert();
  const [loading,setLoading] = useState(false)
  const [hotels,setHotels] = useState([])
   // user
   const auth = useSelector(state => state.auth);
   const token = useSelector(state => state.token)
   const {user} = auth;
 

  //  console.log(token);
  // handel click functiion
  const handelClick = async()=>{
    setLoading(true);
    try {
      let res = await createConnectAccount(token);
      console.log("the response is==>",res);
      window.location.href=res.data;
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error);
      alert.error('Stripe connect failed, Try again!')
      
      
    }

  }

  useEffect(()=>{
    loadSellersHotel()
  
  },[])

  const loadSellersHotel =async()=>{
    let {data} = await sellerHotels(token);
    setHotels(data);
  }
  const handelHotelDelete = async(hotelId)=>{
    if(!window.confirm("Are you sure?")) return;

      deleteHotel(token,hotelId).then(res=>{
        alert.success("Hotel deleted");
        loadSellersHotel();
      }
      ).catch(err=>console.log(err))
  }

  const connected = ()=>
      (<div className='container-fluid'>
          <div className="row">

            <div className="col-md-10">
              <h2 >Your Hotels</h2>
            </div>

            <div className="col-md-2">
              <Link to="/hotels/new" className='btn'>+ Add New</Link>
            </div>

          </div>
          
          {/* here are your own hotels */}
          {hotels&& hotels.map((h)=>
          <SmallCard 
          key={h._id}
          h={h} 
          viewMoreButton={false}
          owner={true}
          handelHotelDelete={handelHotelDelete}
            />)}
            
      </div>)
  
  const notConnected = ()=>
    (<div className='container-fluid'>
          <div className="row">

            <div className="col-md-6 offset-md-3 text-center mt-5 notconnected">
              <div className="pt-5 pointer">
                <ImHome className="h1"/>
                <h1>Setup payouts to post hotel rooms</h1>
                <p className="lead"><strong>Yodoor</strong> partners with stripe to transfer earnings to your back account</p>
              </div>
              <h2 >Connect with stripe</h2>
              <div className="btn" 
              disabled={loading} 
              onClick={handelClick}
              >
                {loading? 'Processing...':'Setup Payouts'}
                </div>
              <p className="text-muted pt-3">
                <small>You'll be directed to stripe to complete the onboarding process</small>
              </p>
            </div>
          </div>
           
      </div>)
  
  return (
    <div className="dashboardseller ">
        <div className='dashboard-text'>
            <h1> Seller Dashboard</h1>
              <ConnectNav/>
        </div>
        <DashboardNav/>
      
        {auth&&
        user&&
        user.stripe_seller&&
        user.stripe_seller.charges_enabled 
        ? connected()
        : notConnected()
        }
        {/* <pre>{JSON.stringify(auth,null,4)}</pre> */}
        
    </div>
        
   
  )
}

export default DashboardSeller