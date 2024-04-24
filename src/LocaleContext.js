import React from "react";

const LocaleContext = React.createContext({
  locale: "en",
  setLocale: () => {},
});

export default LocaleContext;
