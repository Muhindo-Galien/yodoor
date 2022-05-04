import React, {useState} from 'react'
import {Card,Avatar} from 'antd'
import moment from 'moment'
import { useSelector } from 'react-redux';
import "./connectNav.css"
// npm install --save @ant-design/icons
const {Meta} =  Card;

const ConnectNav = () => {
    const auth = useSelector(state => state.auth);
    const {user} = auth;
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
            <div className='colorit'>Pending balance</div>
            <div className='colorit'>Payout Settings</div>
          </>
        )
      }
    </div>
  )
}

export default ConnectNav