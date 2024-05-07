import axios from "axios"
const baseURL = 'http://localhost:3000/api'

const DoctorcareApi = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    }
});

export default DoctorcareApi;
