import React, { createContext, useState } from 'react';

export const formDataContext = createContext();

export const Context = ({ children }) => {
  const [formData, setFormData] = useState({});
  const value = {
    formData,
    setFormData,
  };
  return <formDataContext.Provider value={value}>{children}</formDataContext.Provider>;
};
