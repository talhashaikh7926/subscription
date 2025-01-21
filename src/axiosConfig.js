import axios from 'axios';
import { BASEURL } from './config';


const instance = axios.create({
    baseURL: BASEURL
});

export default instance;


