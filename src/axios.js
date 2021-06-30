import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5001/clone-5bdd0/us-central1/api'   // The API url
});

export default instance;

// http://localhost:5001/clone-5bdd0/us-central1/api
// https://us-central1-clone-5bdd0.cloudfunctions.net/api