import axios from "axios";

export const createConnectAccount =  async(token)=>{
    const res = await axios.post('/api/create-connect-account',{},{
        headers: {Authorization: token}
    });
    return res
}

export const getAccountStatus = async(token) => {
    const res = axios.post('/api/get-account-status',{},{
    headers: {Authorization: token}})
    return res
}
export const getAccountBalance = async(token) => {
    const res = axios.post('/api/get-account-balance',{},{
    headers: {Authorization: token}})
    return res
}

export const currencyFormatter = data=>{
    return (data.amount/100).toLocaleString(data.currency, {
        style:"currency",
        currency:data.currency,
    })
}

export const payoutSetting = async(token) => {
    const res = axios.post('/api/payout-setting',{},{
    headers: {Authorization: token}})
    return res
}

export const getSessionId = async(token,hotelId)=>
await axios.post('/api/stripe-session-id',{
    hotelId},{
    headers: {Authorization: token}}
    );



    
export const stripeSuccessRequest = async(token,hotelId)=>
    await axios.post
    ('/api/stripe-success/',
    {hotelId},
    {headers: {Authorization: token}}
        );