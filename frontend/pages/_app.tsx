import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/imageSwiper.css";
import Header from "../components/Header/Header";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "../utills/createEmotionCache";

const queryClient = new QueryClient();
const clientSideEmotionCache = createEmotionCache();
function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <CacheProvider value={clientSideEmotionCache}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider>
          <Toaster />
          <div className="h-screen w-screen overflow-y-auto bg-slate-100">
            <Header />
            <Component {...pageProps} />
          </div>
        </AuthContextProvider>
      </QueryClientProvider>
    </CacheProvider>
  );
}

export default MyApp;
