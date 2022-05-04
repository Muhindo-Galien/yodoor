import React, {useEffect} from 'react';
import { Route, Routes } from "react-router-dom";
import ActivationEmail from "./component/auth/ActivationEmail";
import ForgotPassword from "./component/auth/ForgotPassword";
import Login from "./component/auth/login/Login";
import Register from "./component/auth/Register";
import Home from "./pages/Home";
import Room from "./pages/rooms/Room";
import {useDispatch, useSelector} from 'react-redux'
import {dispatchLogin, fetchUser, dispatchGetUser} from './redux/actions/authAction'
import axios from 'axios';
import ResetPassword from './component/auth/ResetPassword';
import Profile from './component/Profile/Profile';
import Dashboard from './user/Dashboard/Dashboard';
import DashboardSeller from './user/DashboardSeller/DashboardSeller';
import Hotel from './Hotels/Hotel/NewHotel';
import StripeCallback from './stripe/StripeCallback';

function App() {
  const dispatch = useDispatch()
  const token = useSelector(state => state.token)
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin){
      const getToken = async () => {
        const res = await axios.post('/api/user/refresh_token', null)
        dispatch({type: 'GET_TOKEN', payload: res.data.access_token})
      }
      getToken()
    }
  },[auth.isLogged, dispatch])

  useEffect(() => {
    if(token){
      const getUser = () => {
        dispatch(dispatchLogin())

        return fetchUser(token).then(res => {
          dispatch(dispatchGetUser(res))
        })
      }
      getUser()
    }
  },[token, dispatch])
  return (
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/forgot_password" element={<ForgotPassword/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/user/activate/:activation_token" element={<ActivationEmail/>} />
      <Route path="/user/reset/:token" element={<ResetPassword/>} />
      <Route path="/profile" element={<Profile/>} />
      <Route path="/dashboard" element={auth.isLogged?<Dashboard/>:<Login/>} />
      <Route path="/dashboard/seller" element={auth.isLogged?<DashboardSeller/>:<Login/>} />
      <Route path="/hotels/new" element={auth.isLogged?<Hotel/>:<Login/>} />
      <Route path="/stripe/callback" element={auth.isLogged?<StripeCallback/>:<Login/>} />
      <Route path="/rooms" element={<Room/>} />
    </Routes>
  );
}

export default App;
