import axios from 'axios'

export const getAllUsers = async() => {
    const res = await axios.get("/api/all-users");
    return res
}
export const adminUpdateHotel = async (token, hotelData, hotelId) =>
         await axios.put(`/api/admin/edit/hotel/${hotelId}`, hotelData, {
           headers: { Authorization: token },
         });
// export const adminHotelDocs = async (token) =>{
//           const res = await axios.get("/api/admin/all-verification-request", {
//             headers: { Authorization: token },
//           });
//          return res
//         }

export const adminHotelDocs = async (token) => {
         const res = await axios.get("/api/admin/all-verification-request", {
           headers: { Authorization: token },
         });
         return res;
       };