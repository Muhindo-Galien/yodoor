import React, { useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {useDispatch} from 'react-redux'
import {showErrMsg, showSuccessMsg} from '../../utils/notification/Notification'
import {dispatchLogin} from '../../../redux/actions/authAction'
import { FcGoogle } from 'react-icons/fc';
import { FaFacebookF } from 'react-icons/fa';
import { useAlert } from 'react-alert'

const initialState = {
  email: '',
  password: '',
  err: '',
  success: ''
}


const Login = () => {
  const [user, setUser] = useState(initialState);
  const {email, password, err, success} = user;
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const alert = useAlert()
  const handleChangeInput = e => {
    const {name, value} = e.target
    setUser({...user, [name]:value, err: '', success: ''})
    console.log(user);

  }
  const handleSubmit = async e => {
    e.preventDefault()
    try {
        const res = await axios.post('/api/user/login', {email, password})
        console.log(res);
        setUser({...user, err: '', success: res.data.msg})
        alert.success(res.data.msg)

        localStorage.setItem('firstLogin', true)

        dispatch(dispatchLogin())
        navigate('/');

    } catch (err) {
        err.response.data.msg && 
        alert.error(err.response.data.msg)

    }
}

  return (
    <>
      <div className="X">
      <h1>Login</h1>  
      {/* {err && showErrMsg(err)}
      {success && showSuccessMsg(success)} */}
      <form classNameName="s4" onSubmit={handleSubmit}>
        <ul className="lsn"> 
          <li><a href="#" id="gl"><span><FcGoogle/></span> Login with google</a></li>
          <li><a href="#" id="fb"><span><FaFacebookF/></span> Login with facebook</a></li>
        </ul>
        
        <label htmlFor="email"> Email:</label>
        <input id='email' type="email" value={email}   name="email" onChange={handleChangeInput}/>

        <label htmlFor='password' className="pss"> Password: <Link to='/forgot_password'><a href="#">Forgot?</a></Link></label>
        <input type="password" id="password" value={password} name="password" onChange={handleChangeInput} />

        <input type="submit"  />
      </form>   
      </div>
    </>
  )
}

export default Login