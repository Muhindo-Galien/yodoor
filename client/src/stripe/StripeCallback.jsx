import React, { useEffect, useState } from 'react'
import "./stripecallback.css"
import {LoadingOutlined} from "@ant-design/icons"
import { useDispatch, useSelector } from 'react-redux'
import { getAccountStatus } from '../redux/actions/stripe'
import {updateInLocalStorage} from '../redux/actions/authAction'

const StripeCallback = ({history}) => {
    const [loading,SetLoading] = useState(false);
    const token = useSelector(state => state.token);
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    // get-account-status
    useEffect(() => {
      if(auth&&token) accountStatus()
    }, [auth,token])
    const accountStatus = async()=>{
        try {
            const res = await getAccountStatus(token)
            // console.log("USER ACCOUNT STATUS ON STRIPE CALLBACK", res);
            updateInLocalStorage(res.data, ()=>{
                dispatch({
                    type:"LOGIN",
                    payload:res.data
                })
            })
        } catch (error) {
            console.log(error);
        }
    }
    
  return (
    <div className='stripecallback'>
        <di className="d-flex justify-content-center p-5">
            <LoadingOutlined className="display-1 p-5  text-danger"/>
        </di>
      
    </div>
  )
}

export default StripeCallback