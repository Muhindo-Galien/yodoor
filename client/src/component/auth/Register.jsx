import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import {showErrMsg, showSuccessMsg} from '../../component/utils/notification/Notification'
import {isEmpty, isEmail, isLength, isMatch} from '../../component/utils/validation/Validation'
import '../auth/login/login.css'


const initialState = {
    name: '',
    email: '',
    password: '',
    cf_password: '',
    err: '',
    success: ''
}

function Register() {
    const [user, setUser] = useState(initialState)

    const {name, email, password,cf_password, err, success} = user

    const handleChangeInput = e => {
        const {name, value} = e.target
        setUser({...user, [name]:value, err: '', success: ''})
    }


    const handleSubmit = async e => {
        e.preventDefault()
        if(isEmpty(name) || isEmpty(password))
                return setUser({...user, err: "Please fill in all fields.", success: ''})

        if(!isEmail(email))
            return setUser({...user, err: "Invalid emails.", success: ''})

        if(isLength(password))
            return setUser({...user, err: "Password must be at least 6 characters.", success: ''})
        
        if(!isMatch(password, cf_password))
            return setUser({...user, err: "Password did not match.", success: ''})

        try {
            const res = await axios.post('/api/user/register', {
                name, email, password
            })

            setUser({...user, err: '', success: res.data.msg})
        } catch (err) {
            err.response.data.msg && 
            setUser({...user, err: err.response.data.msg, success: ''})
        }
    }

    return (
        <div className="X">
            <h1>Register</h1>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form className="s4"  onSubmit={handleSubmit}>
                
                <label htmlFor="name">Name</label>
                <input type="text"  id="name"
                    value={name} name="name" onChange={handleChangeInput} />
                

                <div>
                    <label htmlFor="email">Email Address</label>
                    <input type="text"  id="email"
                    value={email} name="email" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password"  id="password"
                    value={password} name="password" onChange={handleChangeInput} />
                </div>

                <div>
                    <label htmlFor="cf_password">Confirm Password</label>
                    <input type="password" id="cf_password"
                    value={cf_password} name="cf_password" onChange={handleChangeInput} />
                </div>

                
                    <input type="submit" value="Register"/>
              
            </form>

            <p  className="orlog">Already an account? <Link to="/login"><span>Login</span></Link></p>
        </div>
    )
}

export default Register