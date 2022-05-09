import axios from 'axios'

export const allHotelRooms = async() => {
    
    const res =await axios.get('/api/hotels')
    return res
}
export const allDays= (from,to)=>{
    const day = 24 * 60 * 60 * 1000;
    const start = new Date(from)
    const end = new Date(to)
    const difference = Math.round(Math.abs(start - end)/day) 
    return difference

}
export const sellerHotels = async(token)=> await axios.get('/api/hotel/seller-hotels', {
    headers: {Authorization: token}
})

export const deleteHotel = async(token,hotelId)=> await axios.delete(`/api/delete-hotel/${hotelId}`, {
    headers: {Authorization: token}
})

export const read = async(hotelId)=> await axios.get(`/api/hotel/${hotelId}`)