import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3003'
})

instance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token')
    if(token){
      config.headers[`authorization`] = `bearer ${token}`
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

export default instance
