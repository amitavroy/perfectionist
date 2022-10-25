import Cookies from "js-cookie";

class AuthService {
  public static saveAuthToken = (token: string) => {
    Cookies.set("token", token);
  };

  public static removeAuthToken = () => {
    Cookies.remove("token");
  };
}

export default AuthService;
