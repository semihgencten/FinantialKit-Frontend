import React, { useState, useContext } from "react";
import LocaleContext from "@/LocaleContext";

const LocaleProvider = ({ children }) => {
  const [locale, setLocale] = useState('en');

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
};

export default LocaleProvider;
