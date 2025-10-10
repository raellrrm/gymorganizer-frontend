import { RouterProvider } from "react-router";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { router } from "./routes";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/react-query";
import { Toaster } from "sonner";

export const App = () => {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s - gymorganizer"/>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
        <Toaster/>
      </QueryClientProvider>
    </HelmetProvider>
  );
}