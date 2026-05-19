import axios from "axios";

const API = axios.create({
  baseURL: `http://${window.location.hostname}:5005`
});

export default API;