import axios from "axios";
import { BASE_URL } from "../config/config.js";
import { ErrorHandlers } from "./ErrorHandlers.js";

const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
});


instance.interceptors.response.use(function (response) {

    return response;

}, function (error) {
    return Promise.reject(new ErrorHandlers().ValidationError(error?.response?.data?.message || error?.response?.data?.responseMessage));
});


export default instance
