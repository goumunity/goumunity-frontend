import axios from 'axios'

const client = axios.create({ baseURL: import.meta.env.VITE_API_DEV })
// const client = axios.create({ baseURL: import.meta.env.VITE_API_DEPLOY })

export default client