import axios from "axios";
import { API_URL } from "./config";

console.log(API_URL)

export const api = axios.create({
    baseURL: API_URL,
    // baseURL: "/api", // for ngrok
    // "proxy": "http://localhost:3001", to package.json
    timeout: 5000,
    withCredentials: true,
})