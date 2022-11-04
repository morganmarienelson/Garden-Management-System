import axios from 'axios';

const token = localStorage.getItem('token');
const apiClient = axios.create({
    baseURL: 'http://159.223.113.61:8080/UCGBTEST',
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
   },
});

export default apiClient;


