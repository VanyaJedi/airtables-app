import axios from "axios";

/*const Error = {
  UNAUTHORIZED: 401
};*/


export const createAPI = (onAuth) => {
  const api = axios.create({
    baseURL: `http://localhost:3001/`,
    timeout: 50000,
    withCredentials: false
  });

 /* const onSuccess = (response) => {
    return response;
  };

  const onFail = (err) => {
    const {response} = err;

    if (response.status === Error.UNAUTHORIZED) {
      onUnauth();

      // Бросаем ошибку, потому что нам важно прервать цепочку промисов после запроса авторизации.
      // Запрос авторизации - это особый случай и важно дать понять приложению, что запрос был неудачным.
      throw err;
    }

    throw err;
  };

  api.interceptors.response.use(onSuccess, onFail);*/

  return api;
};
