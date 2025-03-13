import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    {document.cookie !== "" ? (
      <App />
    ) : (
      <div className="w-full h-screen bg-[#101828] p-5">Access Denied</div>
    )}
    <ToastContainer />
  </QueryClientProvider>
);
