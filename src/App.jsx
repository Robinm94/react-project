import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import Nav from "./components/Nav/Nav";
import "./App.css";
import Main from "./components/Main/Main";
import ShowDetails from "./components/ShowDetails/ShowDetails";
import { StrictMode } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 60 * 1000,
      cacheTime: 60 * 60 * 1000,
    },
  },
});

// const queryClient = new QueryClient();

const App = () => {
  return (
    <StrictMode>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <Nav />
          <Routes>
            <Route path="/" Component={Main} />
            <Route path="/:showtype/:showid" Component={ShowDetails} />
            <Route path="*" element={<Navigate to="/" />} />
            {/* <Route path="/about" /> */}
          </Routes>
        </QueryClientProvider>
      </BrowserRouter>
    </StrictMode>
  );
};

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
