import axios from 'axios'


const axiosInstance = axios.create({
    // baseURL: `${process.env.SERVER_LINK}`,
    baseURL:"http://localhost:4000/api",


})


export default axiosInstance 