import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  useEffect(() => {
    const guestRoutes = ["/user/login"];
    if (!guestRoutes.includes(router.pathname)) {
      const token = Cookies.get("token");
      (!token || token == "") && router.push("/user/login");
    }
  }, [router]);
  return <Component {...pageProps} />;
}

export default MyApp;
