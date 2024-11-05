import axios from "axios";

const API = import.meta.env.VITE_API;
const newRequest = axios.create({
    baseURL: `${API}`,
    withCredentials: true
});

export default newRequest;
