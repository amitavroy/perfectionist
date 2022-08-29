import axios from "axios";

class HttpService {
  public static get = async (url: string) => {
    return await axios.get(url);
  };
  public static post = async (url: string, data: any) => {
    return await axios.post(url, data);
  };
}

export default HttpService;
