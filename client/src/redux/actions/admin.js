import axios from 'axios'

export const allUsers = async() => {
    
    const res = await axios.get("/api/all-users");
    return res
}