import axios from "axios";
import { EMethod } from "@/app/type";

const axiosInstanceCustomHeaders = (
  baseURL: string,
  token: string,
  customHeaders = {}
) => {
  const instance = axios.create({
    baseURL,
    timeout: 60000,
    headers: {
      "Access-Control-Allow-Origin": "*",
      ...customHeaders,
    },
  });

  instance.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );

  return instance;
};

const customBaseUrl = "http://localhost:3001/";
const customToken = "";

const customAxiosCustomHeaders = axiosInstanceCustomHeaders(
  customBaseUrl,
  customToken
);

interface IApiProps {
  method: EMethod;
  url: string;
  payload?: any;
  headers?: any;
  onError?: () => {};
}

const API = ({ method, url, payload, headers, onError }: IApiProps) => {
  console.log("payload", payload);
  if (method === EMethod.get) {
    customAxiosCustomHeaders
      .get(url, headers)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  if (method === EMethod.post) {
    customAxiosCustomHeaders
      .post(url, payload, headers)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  if (method === EMethod.put) {
  }

  if (method === EMethod.delete) {
  }
};

export default API;
