import axios from "axios";

const API = axios.create({
    baseURL: "https://springbootjobportal-production-f8ea.up.railway.app"
});

export default API;