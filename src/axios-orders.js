import axios from 'axios'

const instance = axios.create(
    {
        baseURL: 'https://react-my-burger-e013b.firebaseio.com/'
    }
);

export default instance;