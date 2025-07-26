import axios from 'axios'

const api = axios.create({
  baseURL: 'https://safarimovebackend-production.up.railway.app/api',
})

export default api
