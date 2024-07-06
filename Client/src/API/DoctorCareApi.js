import axios from "axios"
const Hostname=import.meta.env.VITE_SERVER_HOST
const baseURL =Hostname+'/api'

const DoctorcareApi = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default DoctorcareApi;
