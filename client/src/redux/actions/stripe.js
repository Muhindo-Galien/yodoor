import axios from "axios";

export const createConnectAccount =  async(token)=>{
    await axios.post('/api/create-connect-account',{},{
        headers: {Authorization: token}
    });
}