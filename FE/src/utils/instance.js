import axios from 'axios'

const instance = axios.create({ baseURL: import.meta.env.VITE_API_DEV })
// const instance = axios.create({ baseURL: import.meta.env.VITE_API_DEPLOY })

export default instance