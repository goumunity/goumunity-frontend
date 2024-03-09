import axios from 'axios'

const { VITE_API_DEV } = import.meta.env;

const instance = axios.create({ baseURL: VITE_API_DEV , withCredentials : true})
// const instance = instance.create({ baseURL: import.meta.env.VITE_API_DEPLOY })
instance.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        if (error.response.status === 401) {
            sessionStorage.clear();
            window.location.href='/landing';
        }
    }
)

export default instance