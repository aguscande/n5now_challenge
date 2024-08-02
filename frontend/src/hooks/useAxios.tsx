import { useMemo } from 'react';
import axios, { AxiosInstance } from 'axios';

interface AxiosInstanceWithInterceptors {
  instance: AxiosInstance;
}

export default function useAxios(): AxiosInstance {
  const axiosInstance: AxiosInstanceWithInterceptors =
    useMemo((): AxiosInstanceWithInterceptors => {
      const instance: AxiosInstance = axios.create({
        baseURL: "http://localhost:8000",
        //timeout: 1000, // in Ms
        //timeoutErrorMessage: 'Timeout',
      });

      return { instance };
    }, []);

  return axiosInstance.instance;
}
