import React, { useState, createContext } from 'react';

interface ContextWrapper {}

export const MainContext = createContext<ContextWrapper | null>(null);

const ContextWrapper = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  const podcastsContext = {
    isLoading,
    setIsLoading,
  };

  return <MainContext.Provider value={podcastsContext}>{children}</MainContext.Provider>;
};

export default ContextWrapper;
