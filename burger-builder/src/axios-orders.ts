import axios from 'axios';

//https://react-my-burger-5403f.firebaseio.com/
//https://localhost:44393/burger

const firebaseInstance = axios.create({
    baseURL: 'https://react-my-burger-5403f.firebaseio.com/'
});
// firebaseInstance.defaults.headers.post['Content-Type'] ='application/json;charset=utf-8';
// firebaseInstance.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const localInstance = axios.create({
    baseURL: 'https://localhost:44393/burger'
});

export default firebaseInstance;