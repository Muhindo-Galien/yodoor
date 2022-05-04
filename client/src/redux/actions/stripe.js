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