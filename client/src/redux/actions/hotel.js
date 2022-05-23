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

export const updateHotel = async(token,hotelData,hotelId)=> await axios.put(`/api/hotel/edit/${hotelId}`,hotelData,{
    headers: {Authorization: token}
})

export const userHotelBookings = async(token)=>await axios.get('/api/user-hotel-bookings',{
    headers: {Authorization: token}
})
export const isAlreadyBooked = async(token,hotelId)=>await axios.get(`/api/is-already-booked/${hotelId}`,{
    headers: {Authorization: token}
})
export const searchListings = async(query)=>await axios.post(`/api/search-listings`,query)