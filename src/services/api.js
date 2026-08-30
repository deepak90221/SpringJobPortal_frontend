import axios from "axios";

const API = axios.create({
    baseURL: "https://springbootjobportal-copy-production.up.railway.app"
});

export default API;