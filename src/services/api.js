import axios from 'axios'

const api = axios.create({
    baseURL:"https://apigspace.herokuapp.com/"
})

export default api;