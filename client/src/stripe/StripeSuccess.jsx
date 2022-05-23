import React, { useEffect } from 'react'
import { LoadingOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { useParams,useNavigate} from 'react-router-dom';
import { stripeSuccessRequest } from '../redux/actions/stripe';
import "./stripecallback.css"


const StripeSuccess = () => {
    const token = useSelector(state => state.token);
    const auth = useSelector(state => state.auth);
    const navigate = useNavigate();
    const {hotelId} = useParams()
    console.log(hotelId);
    useEffect(()=>{
        stripeSuccessRequest(token,hotelId).then((res)=>{
            if(res.data.success){
                // console.log('stripe success response',res);
                navigate('/dashboard')
            }else{
                navigate('/stripe/cancel')
            }
        })
    },[hotelId])
  return (
    <div className='dashboard'>
        <div className="d-flex justify-content-center p-5">

            <LoadingOutlined className="display-1 text-#548CFF p-5"/>
        </div>
    </div>
  )
}

export default StripeSuccess