import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import {
  DownloadProgressContextProvider,
  SocketContextProvider,
} from "./contexts";
import "./index.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <SocketContextProvider>
        <DownloadProgressContextProvider>
          <App />
        </DownloadProgressContextProvider>
      </SocketContextProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
