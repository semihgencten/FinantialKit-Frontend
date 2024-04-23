import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom/client";
import { SpeedInsights } from "@vercel/speed-insights/react"
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import HomePage from "@/pages/HomePage";
import TestPage from "@/pages/TestPage";
import NewsPage from "@/pages/NewsPage";
import AnalysisPage from "@/pages/AnalysisPage";
import WatchlistPage from "@/pages/WatchlistPage";
import PortfolioPage from "@/pages/PortfolioPage";
import MarketsPage from "@/pages/MarketsPage";
// import EquitiesPage from "@/pages/EquitiesPage";
import EquitiesTechnicalsPage from "@/pages/EquitiesTechnicalsPage";
import EquitiesFinancialsPage from "@/pages/EquitiesFinancialsPage";
import EquitiesNewsPage from "@/pages/EquitiesNewsPage";
import EquitiesPeerAnalysisPage from "@/pages/EquitiesPeerAnalysisPage";
import EquitiesChartsPage from "@/pages/EquitiesChartsPage";
import EquitiesOverviewPage from "@/pages/EquitiesOverviewPage";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Provider } from "react-redux";
import store from "@/store";
import { IntlProvider } from "react-intl";
import LocaleContext from "@/LocaleContext";
import SignUp from "@/pages/AuthPages/SignUp";
import SignIn from "@/pages/AuthPages/SignIn";

const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState("en");

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

const speedInsider = ()=> {
    return <SpeedInsights/>
}

const getMessages = (locale) => {
  switch (locale) {
    case "fr":
      return import("./translations/fr.json");
    case "en":
    default:
      return import("./translations/en.json");
  }
};

const App = () => {
  const { locale } = useContext(LocaleContext);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    getMessages(locale).then((msgs) => setMessages(msgs.default));
  }, [locale]);
  speedInsider();
  if (!messages) return <div>Loading...</div>;

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
          path: "/test",
          element: <TestPage />,
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
        //   {
        //     path: "/equities",
        //     element: <EquitiesPage />,
        //   },
        {
          path: "/equities/overview",
          element: <EquitiesOverviewPage />,
        },
        {
          path: "/equities/technicals",
          element: <EquitiesTechnicalsPage />,
        },
        {
          path: "/equities/financials",
          element: <EquitiesFinancialsPage />,
        },
        {
          path: "/equities/news",
          element: <EquitiesNewsPage />,
        },
        {
          path: "/equities/peer-analysis",
          element: <EquitiesPeerAnalysisPage />,
        },

        {
          path: "/equities/charts",
          element: <EquitiesChartsPage />,
        },
        {
          path: "/sign-up",
          element: <SignUp />,
        },
        {
          path: "/sign-in",
          element: <SignIn />, // Bad formatted code
        },
      ],
    },
  ];

  const router = createBrowserRouter(routes);

  return (
    <IntlProvider locale={locale} messages={messages}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </IntlProvider>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LocaleProvider>
      <App />
    </LocaleProvider>
  </React.StrictMode>,
);
