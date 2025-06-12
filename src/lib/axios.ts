import axios from "axios";


export const axioInstance = axios.create({
    baseURL: "http://localhost:4000/api",
    withCredentials: true,
})