import axios from "axios";
import { API_ENDPOINT } from "../config/endpoint.config";
axios.defaults.baseURL = API_ENDPOINT;
export default axios;
