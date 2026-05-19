import axios from 'axios';

export default axios.create({
  baseURL: 'http://host.docker.internal:5000'
});