import axios from "axios";
import Cookies from "js-cookie";

class HttpService {
  private static api = () => {
    const api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL + "/api/",
    });

    api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          console.error("You are not logged in");
          return Promise.reject();
        }
        return Promise.reject(error);
      }
    );

    api.interceptors.request.use((config) => {
      const token = Cookies.get("token");
      if (token && token != "" && config.headers) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });

    return api;
  };
  public static get = async (url: string) => {
    const api = this.api();
    return await api.get(url);
  };
  public static post = async (url: string, data: any) => {
    const api = this.api();
    return await api.post(url, data);
  };
  public static delete = async (url: string) => {
    const api = this.api();
    return await api.delete(url);
  };
}

export default HttpService;
