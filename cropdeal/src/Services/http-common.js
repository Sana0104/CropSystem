import axios from 'axios';

export default axios.create(
    {
        baseURL: "http://localhost:9095/",
        headers: {
            "Content-type": "application/json"
        }
    }
);