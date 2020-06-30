import axios from 'axios';

// 글로벌 설정
export default axios.create({
    baseURL: 'http://127.0.0.1:8000',
    headers: {
        'Content-Type':'application/json'
    }
});
