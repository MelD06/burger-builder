import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://react-my-burger-71937.firebaseio.com/'
});

export default instance;