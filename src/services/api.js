import axios from "axios";

const API = axios.create({
    baseURL: "https://springbootjobportal-production-3d87.up.railway.app"
});

export default API;