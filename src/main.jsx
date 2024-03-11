import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import HomePage from "@/pages/HomePage";
import NewsPage from "@/pages/NewsPage";
import AnalysisPage from "@/pages/AnalysisPage";
import WatchlistPage from "@/pages/WatchlistPage";
import PortfolioPage from "@/pages/PortfolioPage";
import MarketsPage from "@/pages/MarketsPage";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Provider } from "react-redux";
import store from "@/store";

const routes = [
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/news",
        element: <NewsPage />,
      },
      {
        path: "/analysis",
        element: <AnalysisPage />,
      },
      {
        path: "/watchlist",
        element: <WatchlistPage />,
      },
      {
        path: "/my-portfolio",
        element: <PortfolioPage />,
      },
      {
        path: "/markets",
        element: <MarketsPage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
