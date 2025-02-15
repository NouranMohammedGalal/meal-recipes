import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import MealCard from "./components/MealCard/MealCard";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import MealDetails from "./components/MealDetails/MealDetails";
import MealLoadingProvider from "./context/MealLoadingProvider";
import { Offline } from "react-detect-offline";

export default function App() {
  const router = createHashRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <MealCard />,
        },
        {
          path: "category/:category",
          element: <MealCard />,
        },
        {
          path: "mealdetails/:id",
          element: <MealDetails />,
        },
      ],
    },
  ]);
  let client = new QueryClient();
  return (
    <>
      <Offline>
        <div className="text-center text-3xl text-red-600">
          You are offline right now. Check your connection.
        </div>
      </Offline>
      <QueryClientProvider client={client}>
        <ReactQueryDevtools />
        <MealLoadingProvider>
          <RouterProvider router={router}></RouterProvider>
        </MealLoadingProvider>
      </QueryClientProvider>
    </>
  );
}
