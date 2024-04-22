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
  onSuccess?: () => {};
}

const API = ({
  method,
  url,
  payload,
  headers,
  onSuccess,
  onError,
}: IApiProps) => {
  let response;
  if (method === EMethod.get) {
    return customAxiosCustomHeaders
      .get(url, headers)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  if (method === EMethod.post) {
    response = customAxiosCustomHeaders
      .post(url, payload, headers)
      .then((response) => {
        console.log(response.data);
        return response.data;
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  if (method === EMethod.put) {
  }

  if (method === EMethod.delete) {
  }

  console.log("response");

  return response;
};

export default API;
