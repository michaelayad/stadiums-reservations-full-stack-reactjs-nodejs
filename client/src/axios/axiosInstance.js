import axios from 'axios'


const axiosInstance = axios.create({
    // baseURL: `${process.env.SERVER_LINK}`,
    baseURL: "https://stadium-reservation.onrender.com/api",


})


export default axiosInstance 