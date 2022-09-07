import axios from "axios";

class HttpService {
  public static get = async (url: string) => {
    const endpoint = HttpService.getEndPoint(url);
    return await axios.get(endpoint);
  };
  public static post = async (url: string, data: any) => {
    const endpoint = HttpService.getEndPoint(url);
    return await axios.post(endpoint, data);
  };
  public static delete = async (url: string) => {
    const endpoint = HttpService.getEndPoint(url);
    return await axios.delete(endpoint);
  };
  private static getEndPoint = (url: string) => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
    return baseUrl + "/api/" + url;
  };
}

export default HttpService;
