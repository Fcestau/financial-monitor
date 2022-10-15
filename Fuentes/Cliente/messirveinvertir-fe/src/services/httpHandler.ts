import axios from 'axios';

const GENERIC_ERROR = 'Ocurrió un problema, vuelve a intentarlo!';
const URL_MESSIRVEINVERTIR_API = process.env.VUE_APP_URL_MESSIRVEINVERTIR_API;

const iAxios = axios.create({
  baseURL: URL_MESSIRVEINVERTIR_API,
  timeout: 5000,
  withCredentials: true,
});

iAxios.interceptors.response.use(
  (response) => response,
  (error) =>
    Promise.reject(error.response ? error.response.data : GENERIC_ERROR)
);

export default iAxios;
