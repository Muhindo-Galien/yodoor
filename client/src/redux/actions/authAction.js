import ACTIONS from './index'
import axios from 'axios'
import { updateLocale } from 'moment'
import { FcNext } from 'react-icons/fc'

export const dispatchLogin = () => {
    return {
        type: ACTIONS.LOGIN
    }
}

export const fetchUser = async (token) => {
    const res = await axios.get('/api/user/infor', {
        headers: {Authorization: token}
    })
    return res
}


export const dispatchGetUser = (res) => {
    return {
        type: ACTIONS.GET_USER,
        payload: {
            user: res.data,
            isAdmin: res.data.role === 1 ? true : false
        }
    }
}
// update user in Localstorage

export const updateInLocalStorage = (user,next)=>{
    console.log(window.localStorage.getItem('firstLogin'));
    if(window.localStorage.getItem('firstLogin')){
        let auth = JSON.parse(localStorage.getItem('firstLogin'))
        auth.user = user;
        localStorage.setItem('firstLogin', JSON.stringify(auth));
        next();
    }
}


