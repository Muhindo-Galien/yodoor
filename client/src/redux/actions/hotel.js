import axios from 'axios'


// export const createHotel = async (token,data) => {
//     const res = await axios.post('/api/create-hotel',data, {
//         headers: {Authorization: token}
//     })
//     return res
// }

export const createHotel = async(token,data) => {
    const res =await axios.post('/api/create-hotel',data,{
    headers: {Authorization: token}})
    
    return res
}