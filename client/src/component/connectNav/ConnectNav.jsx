import React, {useEffect, useState} from 'react'
import {Card,Avatar,Badge} from 'antd'
import moment from 'moment'
import { useSelector } from 'react-redux';
import "./connectNav.css"
import { currencyFormatter, getAccountBalance, payoutSetting } from '../../redux/actions/stripe';
import { MdSettings } from 'react-icons/md';
import { useAlert } from 'react-alert'


// npm install --save @ant-design/icons
const {Meta} =  Card;
const {Ribbon} =  Badge;


const ConnectNav = () => {
  const alert = useAlert()
  const [loading,setLoading] = useState(false)
    const [balance,setBalance]  = useState(0)
    const auth = useSelector(state => state.auth);
    const {user} = auth;
    const token = useSelector(state => state.token)
    useEffect(()=>{
      getAccountBalance(token).then(res=>{
        // console.log(res);
        setBalance(res.data)
      })
    },[])

    const handelPayoutSettings=async()=>{
      setLoading(true);
      try {
        const res = await payoutSetting(token);
        // console.log("response for payout setting link", res);
        window.location.href=res.data.url
        setLoading(false)
        
      } catch (error) {
        console.log(error);
        alert.error("Unable to access settings , Try again!")
        setLoading(false)
      }
    }
  return (
    <div className='d-flex justify-content-around'>
      {/* <img src={user.avatar} alt="" /> */}
      <Card>
        <Meta avatar={<img src={user.avatar}alt={user.name} className="imageavatar" />} title={user.name} description={`Joined ${moment(user.createdAt).fromNow()}`}/>
      </Card>
      {
        auth&&
        auth.user&&
        auth.user.stripe_seller&&
        auth.user.stripe_seller.charges_enabled && (
          <>
            
              <Ribbon text="Available" color="#13131a">
                <Card className='bg-light pt-1'>
                  {balance&&balance.pending&&(balance.pending).map((bp,i)=>(
                    <span key={i} className="h1">{currencyFormatter(bp)}</span>
                  ))}
                </Card>
              </Ribbon>
          
              <Ribbon text="Payouts" color="#13131a" >
                <Card className='bg-light pointer' onClick={handelPayoutSettings}>
                <MdSettings className='h1 mt-4'/>
                </Card>
              </Ribbon>
          </>
        )
      }
    </div>
  )
}

export default ConnectNav