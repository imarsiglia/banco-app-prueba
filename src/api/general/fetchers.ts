import axios from 'axios';
import {URL_BASE} from '../contants/endpoints';
import {TIME_OUT_MESSAGE, TIME_OUT_REQUEST} from '../contants/messages';

export type ProductRequest = {
  id: string;
  name: string;
  description: string;
  date_release: string;
  date_revision: string;
  logo: string;
};

const publicRest = axios.create({
  baseURL: URL_BASE,
  headers: {
    accept: 'application/json',
  },
  timeout: TIME_OUT_REQUEST,
  timeoutErrorMessage: TIME_OUT_MESSAGE,
});

export const getFetcher = async (route: string) => {
  let source = axios.CancelToken.source();
  setTimeout(() => {
    source.cancel('timeout');
  }, TIME_OUT_REQUEST);

  const response = await publicRest
    .get(route, {
      cancelToken: source.token,
    })
    .catch(error => {
      return createErrorMesage(error);
    });
  return response;
};

export const postFetcher = async (route: string, data: any) => {
  let source = axios.CancelToken.source();
  setTimeout(() => {
    source.cancel('timeout');
  }, TIME_OUT_REQUEST);

  const response = await publicRest
    .post(route, data, {
      cancelToken: source.token,
    })
    .catch(error => {
      return createErrorMesage(error);
    });
  return response;
};

export const putFetcher = async (route: string, data: any) => {
  let source = axios.CancelToken.source();
  setTimeout(() => {
    source.cancel('timeout');
  }, TIME_OUT_REQUEST);

  const response = await publicRest
    .put(route, data, {
      cancelToken: source.token,
    })
    .catch(error => {
      return createErrorMesage(error);
    });
  return response;
};

export const deleteFetcher = async (route: string) => {
  let source = axios.CancelToken.source();
  setTimeout(() => {
    source.cancel('timeout');
  }, TIME_OUT_REQUEST);

  const response = await publicRest
    .delete(route, {
      cancelToken: source.token,
    })
    .catch(error => {
      return createErrorMesage(error);
    });
  return response;
};

function createErrorMesage(error: any) {
  let errorCode = error.code;
  let errorMessage = error.message;
  if (error.message == 'timeout') {
    errorCode = 600;
    errorMessage = TIME_OUT_MESSAGE;
  }
  return {
    ErrCode: errorCode,
    ErrMessage: errorMessage,
    HasError: true,
    data: {
      Status: errorCode,
      ErrMessage: errorMessage,
      HasError: true,
    },
  };
}
