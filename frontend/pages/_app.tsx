import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthContextProvider } from "../context/AuthContext";
import "../styles/imageSwiper.css";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Toaster />
        <div className="h-screen overflow-y-auto bg-slate-200">
          <Component {...pageProps} />
        </div>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
