// AppContext.js
import React, { createContext, useState } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedTags, setSelectedTags] = useState([]);
 

  return (
    <AppContext.Provider value={{ selectedTags, setSelectedTags }}>
      {children}
    </AppContext.Provider>
  );
};

