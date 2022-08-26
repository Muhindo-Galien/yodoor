import React, {useEffect, useState} from 'react';
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
import TryIT from './Hotels/TryIT';
// import { load } from 'algolia-places-react';
// import { allHotelRooms } from './redux/actions/hotel';
import EditHotel from './Hotels/Hotel/EditHotel';
import SingleHotel from './Hotels/signle/SingleHotel';
import StripeSuccess from './stripe/StripeSuccess';
import StripeCancel from './stripe/StripeCancel';
import SearchResult from './Hotels/Results/SearchResult';
import SingleBlog from './pages/blogs/SingleHotel';
// import AdminDashboard from './Admin/AdminDashboard';
import GlobalAdmin from './Admin/GlobalAdmin';
import BlogList from './Admin/BlogList';
import UsersList from './Admin/UsersList';
import AdminEditHotel from './Admin/AdminEditHotel';
import VerificationDocs from './Admin/VerificationDocs/VerificationDocs';

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
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot_password" element={<ForgotPassword />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/user/activate/:activation_token"
        element={<ActivationEmail />}
      />
      <Route path="/user/reset/:token" element={<ResetPassword />} />
      <Route path="/profile" element={<Profile />} />
      <Route
        path="/dashboard"
        element={auth.isLogged ? <Dashboard /> : <Login />}
      />
      <Route
        path="/dashboard/seller"
        element={auth.isLogged ? <DashboardSeller /> : <Login />}
      />
      <Route
        path="/hotels/new"
        element={auth.isLogged ? <Hotel /> : <Login />}
      />
      <Route
        exact
        path="/hotel/edit/:hotelId"
        element={auth.isLogged ? <EditHotel /> : <Login />}
      />
      <Route path="/hotel/:hotelId" element={<SingleHotel />} />
      <Route
        path="/stripe/callback"
        element={auth.isLogged ? <StripeCallback /> : <Login />}
      />
      <Route
        path="/stripe/success/:hotelId"
        element={auth.isLogged ? <StripeSuccess /> : <Login />}
      />
      <Route
        path="/stripe/cancel"
        element={auth.isLogged ? <StripeCancel /> : <Login />}
      />
      <Route path="/tryit" element={auth.isLogged ? <TryIT /> : <Login />} />
      <Route path="/search-result" element={<SearchResult />} />
      <Route path="/rooms" element={<Room />} />
      <Route path="/blog" element={<SingleBlog />} />
      <Route path="/admin" element={<GlobalAdmin />} />
      <Route path="/admin/blogs" element={<BlogList />} />

      <Route path="/admin/users" element={<UsersList />} />
      <Route path="/admin/edit/hotel/:hotelId" element={<AdminEditHotel />} />
      <Route path="/admin/documents" element={<VerificationDocs />} />
    </Routes>
  );
}

export default App;
