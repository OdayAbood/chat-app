import axios from "axios"

export const InstanceAxios = axios.create({
    baseURL : "http://localhost:4000",
    withCredentials : true
})